# DFS pattern

Depth-first search explores one path fully before backtracking; use it when problems ask for traversal, connected components, or cycle checks.

```
Grid DFS (islands)                 Tree DFS

1 1 0 0 0                          A
1 1 0 0 0                         / \
0 0 1 0 0                        B   C
0 0 0 1 1                       / \   \
                                D   E   F

Pick a start cell/node, dive as deep as possible, then backtrack.
```

## How to spot it

Signals DFS is a good fit:

- You need to traverse trees or graphs and process full branches
- The problem asks for connectivity or number of components ("how many groups/islands/clusters")
- You need cycle detection in a graph
- You can mark visited states and avoid revisits

## Walk through: Number of Islands (LC 200)

Given a grid of `"1"` (land) and `"0"` (water), count islands where adjacent land is connected up/down/left/right.

Core idea:

1. Scan every cell.
2. When you find unvisited land, that is one new island.
3. Run DFS from it to mark all connected land as visited.
4. Continue scanning.

Small example:

```
1 1 0
0 1 0
1 0 1
```

- Start at `(0,0)` land -> DFS marks `(0,0), (0,1), (1,1)` -> islands = 1
- Next unvisited land `(2,0)` -> islands = 2
- Next unvisited land `(2,2)` -> islands = 3

```python
def num_islands(grid):
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    visited = set()

    def dfs(r, c):
        if (
            r < 0
            or r >= rows
            or c < 0
            or c >= cols
            or grid[r][c] == "0"
            or (r, c) in visited
        ):
            return

        visited.add((r, c))
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1" and (r, c) not in visited:
                islands += 1
                dfs(r, c)

    return islands
```

Why it works: each land cell is visited once, and each DFS call marks exactly one connected component before returning. Time is O(m*n), space is O(m*n) in worst case.

## Another shape: iterative DFS with an explicit stack

When recursion depth might get large, use a stack manually.

```python
def count_component_size(graph, start):
    visited = set([start])
    stack = [start]
    size = 0

    while stack:
        node = stack.pop()
        size += 1

        for nei in graph[node]:
            if nei not in visited:
                visited.add(nei)
                stack.append(nei)

    return size
```

Same traversal idea, different control flow: LIFO stack gives depth-first behavior.

## Try these

| Problem | Difficulty | Why DFS fits |
| --- | --- | --- |
| Number of Islands (LC 200) | Medium | Connected components in a grid |
| Max Area of Island (LC 695) | Medium | DFS per island to compute area |
| Flood Fill (LC 733) | Easy | Traverse same-color region |
| Clone Graph (LC 133) | Medium | Graph traversal with visited map |
| Course Schedule (LC 207) | Medium | Directed cycle detection |
| Path Sum (LC 112) | Easy | Root-to-leaf depth traversal |
| Validate Binary Search Tree (LC 98) | Medium | Depth traversal with constraints |