# Binary search

Repeatedly halve the search range until you find the answer or the range collapses.

```
Classic (sorted array)              On the answer space

[ . . . . . . . . . . . . ]         1 2 3 4 5 6 7 8 ...
  lo           mid         hi       N N N N Y Y Y Y

  halve based on                    halve by asking
  arr[mid] vs target                "does mid work?"
```

## How to spot it

A few signals that binary search is the move:

- Sorted array and you're looking for a specific value (or the first value that satisfies a condition)
- You can check "does X work?" quickly, and the answers form a monotonic block: no, no, no, YES, yes, yes
- The problem has a hint of O(log n): "find in a sorted array", "minimum / maximum speed / capacity that works"

## Walk through: find 9 in a sorted array

Say you have `[1, 3, 5, 7, 9, 11, 13]` and you want to find the index of `9`.

```
Step 1: lo=0, hi=6, mid=3
[1, 3, 5, 7, 9, 11, 13]
          ^
        arr[3] = 7 < 9, so lo = mid + 1 = 4

Step 2: lo=4, hi=6, mid=5
[1, 3, 5, 7, 9, 11, 13]
                ^
        arr[5] = 11 > 9, so hi = mid - 1 = 4

Step 3: lo=4, hi=4, mid=4
[1, 3, 5, 7, 9, 11, 13]
             ^
        arr[4] = 9, found at index 4
```

Why it works: the array is sorted, so each comparison tells you which half of the range the target must live in. You discard the other half. After roughly log₂(n) steps, the range shrinks to a single element.

```python
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
```

Use `lo + (hi - lo) // 2` instead of `(lo + hi) // 2` to avoid integer overflow in languages with fixed-width ints. In Python it doesn't matter, but the habit carries over.

## Another shape: search on the answer space

Binary search isn't just for sorted arrays. If you can ask "does X work?" and the yes/no answers form a clean block (no, no, no, YES, yes, yes), you can binary search for the first yes.

Classic setup: Koko Eating Bananas (LC 875). You're looking for the smallest eating speed that finishes all piles in `h` hours. Too slow fails. Fast enough passes. Binary search over speeds.

```python
def binary_search_answer(lo, hi, is_good):
    """Smallest value in [lo, hi] where is_good(value) is True."""
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if is_good(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

The shape is the same as classic: halve the range each step. The leap is realizing you're searching over possible answers, not array indices. Notice `hi = mid` (not `mid - 1`) because `mid` itself might be the answer.

## Try these

| Problem | Difficulty | Shape |
| --- | --- | --- |
| Binary Search (LC 704) | Easy | Classic |
| Search Insert Position (LC 35) | Easy | Leftmost / insertion point |
| First Bad Version (LC 278) | Easy | On the answer space |
| Find Peak Element (LC 162) | Medium | Classic (locally monotonic) |
| Search in Rotated Sorted Array (LC 33) | Medium | Classic (with a twist) |
| Koko Eating Bananas (LC 875) | Medium | On the answer space |
| Capacity to Ship Packages (LC 1011) | Medium | On the answer space |
