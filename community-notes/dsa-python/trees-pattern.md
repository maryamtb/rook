# Trees pattern

Most tree problems are one of the classic traversals with a little bookkeeping added. The real decision is which way information flows: down into calls (arguments) or up out of them (return values).

```
        1            Preorder     1 2 4 5 3    root first
       / \           Inorder      4 2 5 1 3    left, root, right (sorted for a BST)
      2   3          Postorder    4 5 2 3 1    children first
     / \             Level order  1 2 3 4 5    BFS with a queue
    4   5
```

Snippets assume `TreeNode(val, left=None, right=None)`.

## Core traversals

Recursive inorder; move the `append` before or after the recursive calls for preorder / postorder.

```python
def inorder(node, out):
    if not node:
        return
    inorder(node.left, out)
    out.append(node.val)
    inorder(node.right, out)
```

Iterative inorder with an explicit stack, for when recursion depth is a risk:

```python
def inorder_iter(root):
    out, stack, node = [], [], root
    while node or stack:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        out.append(node.val)
        node = node.right
    return out
```

Level order is BFS: snapshot `len(q)` to process one level per round.

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

## Binary tree patterns

**Depth / height.** The simplest bubble-up: each node returns 1 + the max of its children.

```python
def depth(node):
    if not node:
        return 0
    return 1 + max(depth(node.left), depth(node.right))
```

**Balanced (LC 110).** Bubble height up, but use `-1` as a sentinel for "already failed" so the check short-circuits.

```python
def is_balanced(root):
    def height(node):
        if not node:
            return 0
        left, right = height(node.left), height(node.right)
        if left == -1 or right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    return height(root) != -1
```

**Diameter (LC 543).** The helper returns what parents need (height); the answer lives in outer state, updated at every node.

```python
def diameter(root):
    best = 0
    def height(node):
        nonlocal best
        if not node:
            return 0
        left, right = height(node.left), height(node.right)
        best = max(best, left + right)
        return 1 + max(left, right)
    height(root)
    return best
```

**Lowest common ancestor (LC 236).** Postorder: if p and q surface from different subtrees, the current node is the LCA.

```python
def lca(root, p, q):
    if not root or root is p or root is q:
        return root
    left = lca(root.left, p, q)
    right = lca(root.right, p, q)
    if left and right:
        return root
    return left or right
```

**Serialize / deserialize (LC 297).** Preorder with explicit null markers is enough to rebuild the tree.

```python
def serialize(root):
    out = []
    def walk(node):
        if not node:
            out.append("#")
            return
        out.append(str(node.val))
        walk(node.left)
        walk(node.right)
    walk(root)
    return ",".join(out)

def deserialize(data):
    vals = iter(data.split(","))
    def build():
        v = next(vals)
        if v == "#":
            return None
        node = TreeNode(int(v))
        node.left = build()
        node.right = build()
        return node
    return build()
```

## BST patterns

**Validate (LC 98).** Bounds flow down as arguments; each node must sit strictly inside its inherited range. Checking only `node` against its children misses violations deeper down.

```python
def is_valid_bst(root):
    def check(node, lo, hi):
        if not node:
            return True
        if not (lo < node.val < hi):
            return False
        return check(node.left, lo, node.val) and check(node.right, node.val, hi)
    return check(root, float("-inf"), float("inf"))
```

**Kth smallest (LC 230).** Inorder visits a BST in sorted order; stop at the kth pop. For kth largest, walk right-first instead.

```python
def kth_smallest(root, k):
    stack, node = [], root
    while node or stack:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val
        node = node.right
```

**Insert / delete.** Both recurse toward the key and reassign the child link on the way back up. Delete has three cases: leaf, one child, two children (swap in the inorder successor, then delete it from the right subtree).

```python
def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def delete(root, key):
    if not root:
        return None
    if key < root.val:
        root.left = delete(root.left, key)
    elif key > root.val:
        root.right = delete(root.right, key)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        succ = root.right
        while succ.left:
            succ = succ.left
        root.val = succ.val
        root.right = delete(root.right, succ.val)
    return root
```

**Sorted array to BST (LC 108).** Middle element becomes the root; recurse on each half for a balanced tree.

```python
def sorted_array_to_bst(nums):
    if not nums:
        return None
    mid = len(nums) // 2
    node = TreeNode(nums[mid])
    node.left = sorted_array_to_bst(nums[:mid])
    node.right = sorted_array_to_bst(nums[mid + 1:])
    return node
```

## Down vs. up: where the information flows

- Information flows **down**: pass it as helper arguments (BST bounds, running path sum).
- Information flows **up**: return it and let the parent combine children (height, subtree sums).
- **Both at once**: return what parents need, keep the global answer in `nonlocal` or outer state (diameter).
- Sentinel returns (`-1` for "already unbalanced") short-circuit a bubble-up without exceptions.

## Try these

| Problem | Difficulty | Pattern |
| --- | --- | --- |
| Maximum Depth of Binary Tree (LC 104) | Easy | Bubble height up |
| Balanced Binary Tree (LC 110) | Easy | Height + sentinel |
| Diameter of Binary Tree (LC 543) | Easy | Height + global best |
| Binary Tree Level Order Traversal (LC 102) | Medium | BFS |
| Validate Binary Search Tree (LC 98) | Medium | Bounds passed down |
| Kth Smallest Element in a BST (LC 230) | Medium | Inorder |
| Lowest Common Ancestor (LC 236) | Medium | Postorder bubble-up |
| Serialize and Deserialize Binary Tree (LC 297) | Hard | Preorder + null markers |

<!-- ROOK:SERIES -->
*More in this series: [Backtracking](backtracking.md) · [BFS pattern](bfs-pattern.md) · [Big-O quick reference](big-o.md) · [Binary search](binary-search.md) · [DFS pattern](dfs-pattern.md) · [1D dynamic programming](dp-1d.md) · [Sliding window](sliding-window.md) · [Two pointers](two-pointers.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
