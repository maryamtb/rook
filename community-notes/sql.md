# SQL quick reference

Standard SQL for tables, queries, joins, aggregation, transactions, and indexes, with PostgreSQL-specific features at the end.

## Tables

Create, change, and delete tables. Constraints (`NOT NULL`, `UNIQUE`, `CHECK`, foreign keys) are declared with the table and enforced by the database.

```sql
CREATE TABLE users (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE,
    age         INT CHECK (age >= 0),
    country     TEXT DEFAULT 'US',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE users ADD COLUMN plan TEXT;
ALTER TABLE users ALTER COLUMN plan SET NOT NULL;
ALTER TABLE users DROP COLUMN plan;
ALTER TABLE users RENAME TO accounts;
DROP TABLE users;

ALTER TABLE orders ADD CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
```

`ON DELETE CASCADE` deletes child rows when the parent row is deleted. Alternatives: `SET NULL`, or the default `NO ACTION` (block the delete).

## Insert, update, delete

```sql
INSERT INTO users (email, age) VALUES ('a@b.com', 30), ('c@d.com', 25);
INSERT INTO users_archive SELECT * FROM users WHERE deleted_at IS NOT NULL;

UPDATE users SET age = age + 1 WHERE id = 1;
DELETE FROM users WHERE created_at < '2020-01-01';
TRUNCATE TABLE sessions;
```

An `UPDATE` or `DELETE` without a `WHERE` affects every row. `TRUNCATE` deletes all rows and is faster than `DELETE` on big tables.

## Select

```sql
SELECT id, email FROM users WHERE age >= 18;
SELECT DISTINCT country FROM users;
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE country IN ('MA', 'FR');
SELECT * FROM users WHERE age BETWEEN 18 AND 30;
SELECT * FROM users WHERE deleted_at IS NULL;
SELECT * FROM users ORDER BY created_at DESC LIMIT 20 OFFSET 40;
SELECT COALESCE(nickname, email) FROM users;
SELECT CASE WHEN age < 18 THEN 'minor' ELSE 'adult' END FROM users;
```

`NULL` never equals anything, so use `IS NULL` / `IS NOT NULL`; `= NULL` matches nothing. `COALESCE` returns the first non-null argument.

## Joins

A join matches rows from two tables on a condition. `INNER JOIN` returns only rows with a match. `LEFT JOIN` returns every row from the left table, with `NULL`s where the right table has no match.

```sql
SELECT o.id, u.email FROM orders o INNER JOIN users u ON u.id = o.user_id;

SELECT u.email, o.id FROM users u LEFT JOIN orders o ON o.user_id = u.id;

SELECT u.email FROM users u LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;                                     -- anti-join: users with no orders

SELECT e.name, m.name FROM employees e JOIN employees m ON m.id = e.manager_id;   -- self join
```

`RIGHT JOIN` is a `LEFT JOIN` with the tables swapped. `FULL OUTER JOIN` keeps unmatched rows from both sides. `CROSS JOIN` returns every combination.

## Aggregation

Aggregate functions collapse many rows into one value per group. `WHERE` filters rows before grouping, `HAVING` filters groups after.

```sql
SELECT COUNT(*), COUNT(DISTINCT user_id), SUM(total), AVG(total), MIN(total), MAX(total)
FROM orders;

SELECT country, COUNT(*)
FROM users
GROUP BY country
HAVING COUNT(*) > 100
ORDER BY COUNT(*) DESC;
```

Every selected column must be in `GROUP BY` or inside an aggregate function.

## Subqueries, CTEs, set operations

A subquery is a query nested inside another. A CTE (`WITH`) gives a subquery a name so the main query is easier to read.

```sql
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 100);
SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

WITH totals AS (
    SELECT user_id, SUM(total) AS lifetime FROM orders GROUP BY user_id
)
SELECT u.email, t.lifetime FROM totals t JOIN users u ON u.id = t.user_id;

SELECT email FROM users UNION SELECT email FROM waitlist;
SELECT email FROM users INTERSECT SELECT email FROM waitlist;
SELECT email FROM users EXCEPT SELECT email FROM waitlist;
```

`EXISTS` stops at the first matching row, so it is often faster than `IN` for large subqueries. `UNION` removes duplicates; `UNION ALL` keeps them and is faster.

## Transactions

A transaction runs several statements as one unit: either all of them commit or none do.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;        -- or ROLLBACK;
```

## Indexes

An index speeds up lookups on a column, in exchange for slightly slower writes. Index the columns you filter and join on.

```sql
CREATE INDEX idx_orders_user_id ON orders (user_id);
CREATE UNIQUE INDEX idx_users_email ON users (email);
CREATE INDEX idx_orders_user_created ON orders (user_id, created_at);
DROP INDEX idx_orders_user_id;
```

A composite index works for queries on its leftmost columns: `(user_id, created_at)` also covers `WHERE user_id = ?`, but not `WHERE created_at = ?` alone.

## PostgreSQL: upsert and RETURNING

Upsert inserts a row, and updates (or skips) instead of failing when a unique constraint is violated. `RETURNING` returns the affected rows without a second query.

```sql
INSERT INTO settings (user_id, key, value)
VALUES (1, 'theme', 'dark')
ON CONFLICT (user_id, key) DO UPDATE SET value = EXCLUDED.value;   -- or DO NOTHING

INSERT INTO users (email) VALUES ('a@b.com') RETURNING id;
DELETE FROM sessions WHERE expired IS TRUE RETURNING *;
```

The `ON CONFLICT` target must match a unique constraint or index. `EXCLUDED` is the row that failed to insert.

## PostgreSQL: JSONB

JSONB stores JSON in a queryable, indexable form. `->` returns `jsonb` (chainable), `->>` returns `text` (comparable).

```sql
SELECT payload -> 'user' ->> 'name' FROM events;
SELECT * FROM events WHERE payload ->> 'type' = 'signup';
SELECT * FROM events WHERE payload @> '{"plan": "pro"}';    -- containment
SELECT jsonb_path_query(payload, '$.items[*].sku') FROM orders;
CREATE INDEX idx_events_payload ON events USING GIN (payload);
```

`@>` checks that the column contains the given JSON, and is the operator a GIN index speeds up.

## PostgreSQL: arrays

```sql
SELECT * FROM posts WHERE 'sql' = ANY (tags);            -- tags is text[]
SELECT * FROM posts WHERE tags @> ARRAY['sql', 'db'];    -- contains all of these
SELECT unnest(tags) AS tag, COUNT(*) FROM posts GROUP BY tag;
```

`ANY` matches if at least one element passes the comparison, `ALL` requires every element to pass. `unnest` turns an array into rows.

## PostgreSQL: window functions

Window functions compute a value across a group of related rows without collapsing them into one, so each row keeps its own output row.

```sql
SELECT user_id, total,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS nth_order,
       RANK()       OVER (ORDER BY total DESC)                      AS spend_rank,
       LAG(total)   OVER (PARTITION BY user_id ORDER BY created_at) AS prev_total
FROM orders;
```

`PARTITION BY` restarts the window for each group. `ROW_NUMBER` never ties, `RANK` leaves gaps after ties, `LAG` / `LEAD` read the previous / next row.

## PostgreSQL: EXPLAIN

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 1;             -- plan only
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1;     -- runs it, shows real timings
```

Watch for `Seq Scan` on a table you meant to index, and estimated row counts far from actual (stale statistics; run `ANALYZE`). `EXPLAIN ANALYZE` executes the statement, so wrap writes in `BEGIN; ... ROLLBACK;`.

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
