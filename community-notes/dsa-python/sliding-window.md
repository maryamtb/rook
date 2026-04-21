# Sliding window

A window of consecutive elements that moves across the array, staying fixed size or expanding and shrinking as it goes.

```
Fixed size                          Variable size

[ 1 3 2 6 1 4 1 ]                   [ a b c d b e f ]
  └─┬─┘                               └───┬───┘
  k = 3                               grows until a rule
  slides right one                    breaks, then shrinks
  step at a time                      from the left
```

## How to spot it

A few signals that sliding window is the move:

- You need the min, max, sum, or count over contiguous subarrays or substrings
- The problem asks for the longest or shortest subarray or substring that satisfies a condition
- The window contents matter, but you don't need to re-examine every element at every step

## Walk through: Max sum of k consecutive elements

You have `[1, 3, 2, 6, 1, 4, 1]` and `k = 3`. Find the maximum sum of any 3 consecutive elements.

The trick: don't recompute the full window at each step. When the window slides one to the right, only two things change: you drop the leftmost element and add a new one on the right. The sum updates in O(1) per slide.

```
[1, 3, 2, 6, 1, 4, 1]    window = [1,3,2], sum = 6
 └───┬───┘
[1, 3, 2, 6, 1, 4, 1]    sum = 6 - 1 + 6 = 11
    └───┬───┘
[1, 3, 2, 6, 1, 4, 1]    sum = 11 - 3 + 1 = 9
       └───┬───┘
[1, 3, 2, 6, 1, 4, 1]    sum = 9 - 2 + 4 = 11
          └───┬───┘
[1, 3, 2, 6, 1, 4, 1]    sum = 11 - 6 + 1 = 6
             └───┬───┘

best = 11
```

```python
def max_sum_window(arr, k):
    window = sum(arr[:k])
    best = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i - k]
        best = max(best, window)
    return best
```

## Another shape: variable-size window

When the window size isn't fixed. You expand the right edge until some rule breaks, then shrink from the left until the rule holds again. Classic problem: the longest substring without repeating characters.

```python
def longest_unique(s):
    seen = {}
    lo = 0
    best = 0
    for hi, ch in enumerate(s):
        if ch in seen and seen[ch] >= lo:
            lo = seen[ch] + 1
        seen[ch] = hi
        best = max(best, hi - lo + 1)
    return best
```

`hi` expands the window to the right. The moment it hits a character already inside the window, pull `lo` to just past the previous occurrence so the window stays unique. Track the longest length along the way.

## Try these

| Problem | Difficulty | Shape |
| --- | --- | --- |
| Maximum Average Subarray I (LC 643) | Easy | Fixed |
| Longest Substring Without Repeating (LC 3) | Medium | Variable |
| Permutation in String (LC 567) | Medium | Fixed |
| Find All Anagrams in a String (LC 438) | Medium | Fixed |
| Longest Repeating Character Replacement (LC 424) | Medium | Variable |
| Minimum Window Substring (LC 76) | Hard | Variable |
