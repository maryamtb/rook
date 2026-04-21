# Two pointers

Two indices moving through an array so each element is visited once instead of every pair.

```
Opposite ends                      Fast and slow

[ _ _ _ _ _ _ _ _ ]                [ _ _ _ _ _ _ _ _ ]
  ^             ^                    ^   ^
  lo           hi                   slow fast

  pointers move inward               fast scans ahead,
  until they meet                    slow advances conditionally
```

## How to spot it

A few signals that two pointers is the move:

- You're working with an array or string and comparing pairs or scanning from both ends
- The input is sorted, or sorting it first is fine
- The problem asks you to find a pair, do something in-place, or rearrange elements

## Walk through: Two Sum II

Say you have a sorted array `[1, 2, 5, 8, 11]` and you need to find two indices whose values sum to `13`.

Start with one pointer at each end. Move whichever one helps you get closer:

```
[1, 2, 5, 8, 11]      sum = 1 + 11 = 12, too small, slide lo right
 ^           ^
[1, 2, 5, 8, 11]      sum = 2 + 11 = 13, found
    ^        ^
```

Why it works: the array is sorted, so when the sum is too small, the only way to grow it is to slide `lo` right and pick a bigger left value. When it's too big, slide `hi` left. Each move eliminates a whole batch of pairs at once. That's why this runs in O(n) instead of O(n²).

```python
def two_sum_sorted(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        s = arr[lo] + arr[hi]
        if s == target:
            return [lo, hi]
        elif s < target:
            lo += 1
        else:
            hi -= 1
    return []
```

## Another shape: fast and slow

Sometimes the two pointers don't start at opposite ends. They both start at the front, but one moves faster than the other. This shape shows up in cycle detection (Floyd's algorithm) and in-place dedup.

```python
def remove_duplicates(arr):
    slow = 0
    for fast in range(1, len(arr)):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]
    return slow + 1
```

Think of `slow` as "where the next unique value should go." `fast` scans ahead and only bumps `slow` forward when it finds something new.

## Try these

| Problem | Difficulty | Shape |
| --- | --- | --- |
| Two Sum II (LC 167) | Easy | Opposite ends |
| Valid Palindrome (LC 125) | Easy | Opposite ends |
| 3Sum (LC 15) | Medium | Opposite ends + outer loop |
| Container With Most Water (LC 11) | Medium | Opposite ends |
| Remove Duplicates (LC 26) | Easy | Fast / slow |
| Linked List Cycle (LC 141) | Easy | Fast / slow |
| Happy Number (LC 202) | Easy | Fast / slow |
