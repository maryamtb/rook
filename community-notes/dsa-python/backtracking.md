# Backtracking

Build a candidate one choice at a time; when a path can't lead to a valid answer, undo the last choice and try the next one.

```
Subsets of [1, 2]: branch on include / skip

                     []
include 1?     /            \
             [1]             []
include 2?  /    \          /   \
         [1,2]   [1]      [2]    []

Every leaf is one answer. Backtracking walks this tree,
appending on the way down and popping on the way up.
```

## How to spot it

Signals backtracking is the move:

- "Return **all** permutations / combinations / subsets / partitions"
- The problem wants the answers themselves, not a count or a best value (count or best usually means DP)
- Grid placement under constraints (N-Queens, Sudoku, word search)
- Tiny input sizes (n around 20 or less), because the output is exponential

## The template

```python
def backtrack(path):
    if is_complete(path):
        results.append(path.copy())
        return
    for choice in current_choices(path):
        path.append(choice)   # choose
        backtrack(path)       # explore
        path.pop()            # undo
```

The choose / explore / undo sequence is the whole pattern. The `path.copy()` matters: `path` is mutated in place, so appending it directly stores a reference that later empties out.

## Walk through: Subsets (LC 78)

Return all subsets of a list of distinct integers. Every element is either in or out, so the decision tree above is exactly the answer space.

```python
def subsets(nums):
    res, path = [], []

    def backtrack(start):
        res.append(path.copy())
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1)
            path.pop()

    backtrack(0)
    return res
```

Why it works: `start` only moves forward, so each subset is built in one canonical order and never duplicated. Every node in the tree records its current path, giving all 2ⁿ subsets.

## Another shape: permutations (track what's used)

Permutations pick from the whole array at every level, so instead of a `start` index you track which elements are already in the path.

```python
def permute(nums):
    res, path, used = [], [], set()

    def backtrack():
        if len(path) == len(nums):
            res.append(path.copy())
            return
        for i, n in enumerate(nums):
            if i in used:
                continue
            used.add(i)
            path.append(n)
            backtrack()
            path.pop()
            used.discard(i)

    backtrack()
    return res
```

Prune as early as possible: fail a branch the moment it breaks a constraint (a queen is attacked, the remaining sum went negative), not when you reach the leaf. Pruning is the difference between "exponential but fine" and timeout.

## Try these

| Problem | Difficulty | Shape |
| --- | --- | --- |
| Subsets (LC 78) | Medium | Include / skip with start index |
| Permutations (LC 46) | Medium | Used set |
| Combination Sum (LC 39) | Medium | Start index, reuse allowed |
| Letter Combinations of a Phone Number (LC 17) | Medium | One choice per position |
| Palindrome Partitioning (LC 131) | Medium | Cut points + validity check |
| Word Search (LC 79) | Medium | Grid DFS with undo |
| N-Queens (LC 51) | Hard | Row by row with pruning |

<!-- ROOK:SERIES -->
*More in this series: [BFS pattern](bfs-pattern.md) · [Big-O quick reference](big-o.md) · [Binary search](binary-search.md) · [DFS pattern](dfs-pattern.md) · [1D dynamic programming](dp-1d.md) · [Sliding window](sliding-window.md) · [Trees pattern](trees-pattern.md) · [Two pointers](two-pointers.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
