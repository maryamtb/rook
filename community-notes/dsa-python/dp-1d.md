# 1D dynamic programming

Define "the answer for the first i items", compute each subproblem once, and build the final answer from smaller ones.

```
Climbing stairs: ways(i) = ways(i-1) + ways(i-2)

step:   0    1    2    3    4    5
ways:   1    1    2    3    5    8
                  ^────┐
                       each cell is the sum
                  ^────┘  of the two before it
```

## How to spot it

Signals 1D DP is the move:

- The ask is "minimum / maximum cost", "number of ways", or "can you reach X"
- A choice now restricts what's allowed next (rob this house, must skip the neighbor)
- The brute-force recursion recomputes the same states over and over (overlapping subproblems)
- The state fits in one number: an index or a remaining amount

## Walk through: Climbing Stairs (LC 70)

You climb 1 or 2 steps at a time; count the distinct ways to reach step `n`. The last move was either from `n-1` or from `n-2`, so `ways(n) = ways(n-1) + ways(n-2)`.

Memoization (top-down): write the plain recursion, cache it.

```python
from functools import lru_cache

def climb_stairs(n):
    @lru_cache(None)
    def ways(i):
        if i <= 1:
            return 1
        return ways(i - 1) + ways(i - 2)
    return ways(n)
```

Tabulation (bottom-up): fill an array from the base cases forward.

```python
def climb_stairs(n):
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
```

Why it works: without the cache, `ways(i)` fans out into an O(2ⁿ) call tree that recomputes every subtree many times. Caching (or tabulating) makes each of the n states cost O(1), so the whole thing is O(n).

Both forms encode the same recurrence. Memoization is faster to write and only visits reachable states; tabulation avoids recursion depth limits and enables the space optimization below.

## Another shape: rolling variables (House Robber, LC 198)

When `dp[i]` only looks back a fixed number of steps, you don't need the array. House Robber: `best(i) = max(best(i-1), best(i-2) + nums[i])`, so two variables suffice.

```python
def rob(nums):
    prev, curr = 0, 0   # best up to i-2, best up to i-1
    for n in nums:
        prev, curr = curr, max(curr, prev + n)
    return curr
```

Same recurrence, O(1) space. Write the array version first, then collapse it once the indices are stable.

## Try these

| Problem | Difficulty | Shape |
| --- | --- | --- |
| Climbing Stairs (LC 70) | Easy | Count ways, look back 2 |
| Min Cost Climbing Stairs (LC 746) | Easy | Min cost, look back 2 |
| House Robber (LC 198) | Medium | Take / skip |
| Decode Ways (LC 91) | Medium | Count ways with validity checks |
| Word Break (LC 139) | Medium | Reachability over prefixes |
| Coin Change (LC 322) | Medium | Min over all coins per amount |
| Longest Increasing Subsequence (LC 300) | Medium | Look back over all j < i |

<!-- ROOK:SERIES -->
*More in this series: [Backtracking](backtracking.md) · [BFS pattern](bfs-pattern.md) · [Big-O quick reference](big-o.md) · [Binary search](binary-search.md) · [DFS pattern](dfs-pattern.md) · [Sliding window](sliding-window.md) · [Trees pattern](trees-pattern.md) · [Two pointers](two-pointers.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
