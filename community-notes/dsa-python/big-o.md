# Big-O quick reference

Time and space complexity for common operations and patterns.

## Growth rates

For n = 1,000,000 on a modern CPU (~10⁹ operations per second):

```
O(1)         ▌                            1 operation               nanoseconds
O(log n)     █                            ~20 operations            nanoseconds
O(n)         ████████                     10⁶ operations            ~1 millisecond
O(n log n)   ████████████                 ~2 × 10⁷ operations       ~20 milliseconds
O(n²)        ████████████████████████     10¹² operations           ~16 minutes
O(2^n)       beyond chart scale           2^(10⁶) operations        infeasible
```

## Scaling to different n

| n       | O(log n) | O(n)    | O(n log n)  | O(n²)          |
|---------|----------|---------|-------------|----------------|
| 10      | 3        | 10      | 33          | 100            |
| 100     | 7        | 100     | 664         | 10,000         |
| 1,000   | 10       | 1,000   | 9,966       | 1,000,000      |
| 10,000  | 13       | 10,000  | 132,877     | 100,000,000    |
| 100,000 | 17       | 100,000 | 1,660,964   | 10,000,000,000 |

The jump from O(n log n) to O(n²) at n = 10,000 is the difference between 100 ms and 100 seconds.

## What each class looks like

**O(1): direct access**

```
[ _ _ _ _ _ _ _ _ _ _ ]
        ^
        one step, regardless of size
```

**O(log n): halve the range**

```
[ _ _ _ _ _ _ _ _ _ _ _ _ ]    step 1
      [ _ _ _ _ _ _ ]           step 2
            [ _ _ _ ]            step 3
                [ _ ]            step 4
```

**O(n): scan once**

```
[ _ _ _ _ _ _ _ _ _ _ _ _ ]
  → → → → → → → → → → → →
```

**O(n²): nested scan**

```
[ _ _ _ _ _ _ ]    outer
  [ _ _ _ _ _ _ ]  inner, for each outer
  [ _ _ _ _ _ _ ]
  [ _ _ _ _ _ _ ]
  ...

n × n checks total
```

## Python built-ins

```
list.append(x)             O(1) amortized
list.insert(0, x)          O(n)       shifts everything
list.pop()                 O(1)
list.pop(0)                O(n)       use collections.deque instead
x in list                  O(n)
x in set                   O(1) avg
x in dict / dict[x]        O(1) avg
sorted(lst) / lst.sort()   O(n log n)
lst.reverse()              O(n)
"".join(lst)               O(n)
```

## Standard data structures

```
Hashmap get / set          O(1) avg, O(n) worst
Set add / contains         O(1) avg
Heap push / pop            O(log n)
Heap peek (heap[0])        O(1)
BST operations (balanced)  O(log n)
BST operations (skewed)    O(n)
Linked list access         O(n)
Linked list insert at head O(1)
```

## Sorts

```
Timsort (Python sorted)    O(n log n)  stable, O(n) space
Mergesort                  O(n log n)  stable, O(n) space
Quicksort                  O(n log n) avg, O(n²) worst
Heapsort                   O(n log n)  O(1) space
Bubble / insertion         O(n²)       don't use except for tiny n
```

## Algorithm patterns

```
Two pointers               O(n)
Sliding window             O(n)
Binary search              O(log n)
BFS / DFS                  O(V + E)
Tree traversal             O(n)
Backtracking               O(branches^depth)   often exponential
1D DP                      O(n)
2D DP                      O(n × m)
Dijkstra (with heap)       O((V + E) log V)
```
