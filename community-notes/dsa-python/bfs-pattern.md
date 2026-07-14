# BFS pattern

Breadth-first search explores level by level with a queue; in an unweighted graph, the first time you reach a node is via a shortest path.

```
Tree levels                        Grid BFS (ripples)

        A          level 0         . 2 1 2 .
       / \                         . 1 0 1 .
      B   C        level 1         . 2 1 2 .
     / \   \
    D   E   F      level 2         distances expand outward
                                   from the source, one ring
                                   per round
```

## How to spot it

Signals BFS is a good fit:

- Shortest path or minimum steps in an unweighted graph or grid
- The output is organized by level ("level order", "zigzag", "right side view")
- "Minimum number of moves / minutes / mutations"
- Something spreads outward from one or more starting points

## Walk through: Binary Tree Level Order Traversal (LC 102)

Return the tree's values grouped by depth: `[[root], [depth 1], [depth 2], ...]`.

Core idea: the queue holds exactly one level at a time. Snapshot `len(q)`, pop that many nodes, push their children. When the loop ends, the queue holds the next level.

```python
from collections import deque

def level_order(root):
    if not root:
        return []

    levels, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        levels.append(level)
    return levels
```

Why it works: every node is enqueued once and dequeued once, so time is O(n). The `for _ in range(len(q))` snapshot is what separates levels; without it you get a flat traversal.

## Another shape: multi-source BFS (Rotting Oranges, LC 994)

BFS doesn't need a single start. Seed the queue with every source, then expand them together; each round of the loop is one unit of time.

```python
from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    q, fresh = deque(), 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                q.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    minutes = 0
    while q and fresh:
        for _ in range(len(q)):
            r, c = q.popleft()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1
    return -1 if fresh else minutes
```

Marking a cell rotten *when you enqueue it* (not when you pop it) is the visited check; it stops the same cell from being queued twice.

## Try these

| Problem | Difficulty | Shape |
| --- | --- | --- |
| Binary Tree Level Order Traversal (LC 102) | Medium | Level-by-level |
| Minimum Depth of Binary Tree (LC 111) | Easy | Stop at first leaf |
| Rotting Oranges (LC 994) | Medium | Multi-source |
| 01 Matrix (LC 542) | Medium | Multi-source |
| Shortest Path in Binary Matrix (LC 1091) | Medium | Grid shortest path |
| Open the Lock (LC 752) | Medium | Implicit graph of states |
| Word Ladder (LC 127) | Hard | Implicit graph of words |

<!-- ROOK:SERIES -->
*More in this series: [Backtracking](backtracking.md) · [Big-O quick reference](big-o.md) · [Binary search](binary-search.md) · [DFS pattern](dfs-pattern.md) · [1D dynamic programming](dp-1d.md) · [Sliding window](sliding-window.md) · [Trees pattern](trees-pattern.md) · [Two pointers](two-pointers.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
