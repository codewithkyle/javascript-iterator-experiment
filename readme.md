# Postmortem

`for()` vs `map()` vs `forEach()` vs `filter()`

`map()` and `forEach()` and `filter()` are higher-order functions that provide a more declarative way to loop over arrays, but they also introduce additional overhead such as creating a new array or invoking a callback function on every element. While these overheads may be negligible for small arrays, they can add up when processing large amounts of data.

The other key difference is the ability to `break` out of the loop. Only `for()` loops allow breaking. This can be useful when you only need to locate 1 or more specific values within an array. Since you cannot break out of the higher-order functions the system must evaluate every value within the array even if you've already discovered all desired values.

My general rules for approaching loops:

- Default to `for()` loops
    - On average they provide the best performance
    - Preallocate when possible
    - Easier to reason about when switching between different languages
- Break when possible.
- Use `forEach()` when working with a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) (after calling `querySelectorAll()`)
- Use `map()` when `for()` loops can't be used (such as mapping out data within a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) string) or when looping through an array of objects

Types of `for()` loops:

`for (let i = 0; i < array.length; i++)`: used to iterate through an array, may break early

`for(let i = array.length - 1; i >= 0; i--)`: used to iterate backwards through an array, may break early, used when you need to drop values from an array

`for (const key in object)`: used to iterate through the keys in an object, may break early

`for (const value of array)`: used to iterate through an array, may break early, iterations can be awaited

After watching [this talk by Mathias Bynens](https://www.youtube.com/watch?v=m9cTaYI95Zc) and reading through the V8 source code I decided to perform some tests. I wanted to compare average, max, and minimum time for the following:

- Arrays with X random integers
- Arrays with X random objects
- Static arrays with X random integers
- Static arrays with X random objects
- Preallocated for loop inserts

My findings:

- For loops are faster (on average)
- For loops are faster when comparing max timings (to filter)
- Preallocated for loops provide the fastest average and min timings
- Map has roughly the same timing as the average for loop when iterating through an array of objects
- Map consistently has (one of) the fastest max timings
- Map consistently has (one of) the slowest min timings
- For each loops are consistently slow

# 100 runs of 10 items (Node v18.14 on i7-9700F @ 3.00GHz)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0008 | 0.0074 | 0.0004 |
| Preallocated For Loop | 0.0007 | 0.0045 | 0.0005 |
| Reverse For Loop | 0.0009 | 0.0218 | 0.0004 |
| For Of Loop | 0.0009 | 0.0221 | 0.0005 |
| Map | 0.0009 | 0.0364 | 0.0005 |
| Filter | 0.0013 | 0.0221 | 0.0005 |
| forEach | 0.0016 | 0.0588 | 0.0005 |


### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0010 | 0.0158 | 0.0005 |
| Preallocated For Loop | 0.0057 | 0.4940 | 0.0005 |
| Reverse For Loop | 0.0010 | 0.0141 | 0.0004 |
| For Of Loop | 0.0012 | 0.0186 | 0.0006 |
| Map | 0.0047 | 0.3977 | 0.0005 |
| Filter | 0.0010 | 0.0139 | 0.0006 |
| forEach | 0.0012 | 0.0429 | 0.0006 |


### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0011 | 0.0220 | 0.0005 |
| Preallocated For Loop | 0.0086 | 0.7728 | 0.0004 |
| Reverse For Loop | 0.0005 | 0.0013 | 0.0004 |
| For Of Loop | 0.0007 | 0.0078 | 0.0006 |
| Map | 0.0006 | 0.0074 | 0.0004 |
| Filter | 0.0008 | 0.0076 | 0.0005 |
| forEach | 0.0010 | 0.0420 | 0.0005 |


### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0007 | 0.0027 | 0.0005 |
| Preallocated For Loop | 0.0007 | 0.0035 | 0.0005 |
| Reverse For Loop | 0.0006 | 0.0064 | 0.0005 |
| For Of Loop | 0.0009 | 0.0139 | 0.0006 |
| Map | 0.0006 | 0.0077 | 0.0005 |
| Filter | 0.0008 | 0.0082 | 0.0006 |
| forEach | 0.0015 | 0.0391 | 0.0006 |

# 100 runs of 100 items (Node v18.14 on i7-9700F @ 3.00GHz)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0104 | 0.6327 | 0.0033 |
| Preallocated For Loop | 0.0067 | 0.3185 | 0.0030 |
| Reverse For Loop | 0.0035 | 0.0111 | 0.0028 |
| For Of Loop | 0.0048 | 0.0245 | 0.0036 |
| Map | 0.0031 | 0.0474 | 0.0025 |
| Filter | 0.0035 | 0.0418 | 0.0024 |
| forEach | 0.0042 | 0.0435 | 0.0011 |


### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0045 | 0.0182 | 0.0037 |
| Preallocated For Loop | 0.0044 | 0.0245 | 0.0035 |
| Reverse For Loop | 0.0041 | 0.0188 | 0.0032 |
| For Of Loop | 0.0053 | 0.0264 | 0.0040 |
| Map | 0.0035 | 0.0172 | 0.0031 |
| Filter | 0.0042 | 0.0228 | 0.0028 |
| forEach | 0.0109 | 0.6777 | 0.0012 |


### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0043 | 0.0203 | 0.0035 |
| Preallocated For Loop | 0.0037 | 0.0109 | 0.0032 |
| Reverse For Loop | 0.0037 | 0.0096 | 0.0030 |
| For Of Loop | 0.0048 | 0.0302 | 0.0036 |
| Map | 0.0026 | 0.0095 | 0.0024 |
| Filter | 0.0038 | 0.0909 | 0.0022 |
| forEach | 0.0035 | 0.0285 | 0.0010 |


### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0043 | 0.0093 | 0.0039 |
| Preallocated For Loop | 0.0041 | 0.0118 | 0.0034 |
| Reverse For Loop | 0.0041 | 0.0170 | 0.0033 |
| For Of Loop | 0.0052 | 0.0185 | 0.0039 |
| Map | 0.0036 | 0.0119 | 0.0031 |
| Filter | 0.0034 | 0.0178 | 0.0028 |
| forEach | 0.0042 | 0.0667 | 0.0010 |

# 100 runs of 1,000 items (Node v18.14 on i7-9700F @ 3.00GHz)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0283 | 0.3640 | 0.0049 |
| Preallocated For Loop | 0.0241 | 0.0744 | 0.0040 |
| Reverse For Loop | 0.0315 | 0.0449 | 0.0276 |
| For Of Loop | 0.0535 | 1.1327 | 0.0358 |
| Map | 0.0156 | 0.0776 | 0.0117 |
| Filter | 0.0335 | 0.7294 | 0.0128 |
| forEach | 0.0167 | 0.0952 | 0.0109 |


### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0310 | 0.0871 | 0.0064 |
| Preallocated For Loop | 0.0377 | 0.9169 | 0.0054 |
| Reverse For Loop | 0.0397 | 0.0842 | 0.0337 |
| For Of Loop | 0.0503 | 0.1134 | 0.0415 |
| Map | 0.0194 | 0.0603 | 0.0130 |
| Filter | 0.0212 | 0.1242 | 0.0136 |
| forEach | 0.0191 | 0.0756 | 0.0117 |


### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0372 | 1.1406 | 0.0044 |
| Preallocated For Loop | 0.2192 | 19.5972 | 0.0038 |
| Reverse For Loop | 0.0445 | 1.2043 | 0.0283 |
| For Of Loop | 0.0433 | 0.0809 | 0.0365 |
| Map | 0.0155 | 0.0515 | 0.0120 |
| Filter | 0.0225 | 0.4601 | 0.0129 |
| forEach | 0.0155 | 0.0804 | 0.0106 |


### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0400 | 1.1424 | 0.0050 |
| Preallocated For Loop | 0.0277 | 0.0901 | 0.0047 |
| Reverse For Loop | 0.0387 | 0.0955 | 0.0335 |
| For Of Loop | 0.0627 | 1.6894 | 0.0389 |
| Map | 0.0159 | 0.0660 | 0.0126 |
| Filter | 0.0190 | 0.1452 | 0.0129 |
| forEach | 0.0186 | 0.1673 | 0.0112 |

# 100 runs of 10,000 items (Node v18.14 on i7-9700F @ 3.00GHz)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0823 | 0.6320 | 0.0509 |
| Preallocated For Loop | 0.0662 | 0.3867 | 0.0403 |
| Reverse For Loop | 0.1959 | 1.8566 | 0.0484 |
| For Of Loop | 0.1850 | 1.6780 | 0.0506 |
| Map | 0.1347 | 0.3791 | 0.1191 |
| Filter | 0.1505 | 0.4263 | 0.1277 |
| forEach | 0.1371 | 0.4226 | 0.1127 |


### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.1171 | 0.5115 | 0.0707 |
| Preallocated For Loop | 0.1357 | 3.0892 | 0.0675 |
| Reverse For Loop | 0.2436 | 1.6431 | 0.0673 |
| For Of Loop | 0.4618 | 20.9113 | 0.0691 |
| Map | 0.2383 | 1.6896 | 0.1378 |
| Filter | 0.2040 | 1.6756 | 0.1505 |
| forEach | 0.2625 | 2.4582 | 0.1317 |


### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.0824 | 0.4435 | 0.0524 |
| Preallocated For Loop | 0.0671 | 0.3996 | 0.0401 |
| Reverse For Loop | 0.1204 | 2.3632 | 0.0519 |
| For Of Loop | 0.1169 | 1.3073 | 0.0590 |
| Map | 0.1368 | 0.4623 | 0.1207 |
| Filter | 0.1407 | 0.3354 | 0.1271 |
| forEach | 0.1649 | 2.0752 | 0.1136 |


### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.3195 | 22.0933 | 0.0648 |
| Preallocated For Loop | 0.0849 | 0.3998 | 0.0525 |
| Reverse For Loop | 0.2343 | 11.2891 | 0.0656 |
| For Of Loop | 0.1231 | 0.4997 | 0.0699 |
| Map | 0.1469 | 0.5508 | 0.1276 |
| Filter | 0.1729 | 1.0994 | 0.1409 |
| forEach | 0.1518 | 0.9142 | 0.1172 |

# 100 runs of 100,000 items (Node v18.14 on i7-9700F @ 3.00GHz)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.8810 | 9.4518 | 0.6601 |
| Preallocated For Loop | 0.7350 | 6.9314 | 0.5758 |
| Reverse For Loop | 0.7796 | 3.5327 | 0.6294 |
| For Of Loop | 1.0984 | 28.5286 | 0.6598 |
| Map | 1.4786 | 2.1404 | 1.3441 |
| Filter | 2.1781 | 16.1730 | 1.4607 |
| forEach | 2.0547 | 8.9200 | 1.3186 |


### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.7218 | 10.9428 | 0.9322 |
| Preallocated For Loop | 1.2156 | 20.6173 | 0.8094 |
| Reverse For Loop | 1.3255 | 16.9759 | 0.8767 |
| For Of Loop | 1.4865 | 10.7712 | 0.9184 |
| Map | 1.8745 | 2.7853 | 1.4903 |
| Filter | 2.3260 | 12.6804 | 1.6293 |
| forEach | 2.3527 | 11.5165 | 1.5008 |


### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.0669 | 6.3935 | 0.6879 |
| Preallocated For Loop | 0.6765 | 3.6227 | 0.5900 |
| Reverse For Loop | 0.8195 | 3.4907 | 0.6863 |
| For Of Loop | 1.0879 | 13.8934 | 0.7366 |
| Map | 1.4673 | 2.0741 | 1.3577 |
| Filter | 1.8498 | 11.1455 | 1.4904 |
| forEach | 1.5378 | 7.9669 | 1.3353 |


### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.3975 | 7.0898 | 0.9199 |
| Preallocated For Loop | 0.9117 | 4.1842 | 0.7992 |
| Reverse For Loop | 1.0658 | 4.2646 | 0.9082 |
| For Of Loop | 1.2091 | 12.0284 | 0.9602 |
| Map | 1.6623 | 6.6456 | 1.4856 |
| Filter | 2.0930 | 11.1917 | 1.6245 |
| forEach | 1.6794 | 8.8432 | 1.4562 |

# 100 runs of 1,000,000 items (Node v18.14 on i7-9700F @ 3.00GHz)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 11.2536 | 60.2223 | 8.4949 |
| Preallocated For Loop | 8.1502 | 48.8376 | 6.1459 |
| Reverse For Loop | 11.2321 | 45.5904 | 9.0459 |
| For Of Loop | 11.8234 | 52.5175 | 9.2427 |
| Map | 18.6923 | 74.5958 | 15.1232 |
| Filter | 22.2707 | 54.4923 | 18.1464 |
| forEach | 18.9217 | 44.0161 | 16.6310 |


### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 12.3507 | 58.8799 | 9.9739 |
| Preallocated For Loop | 9.5224 | 42.7766 | 7.1870 |
| Reverse For Loop | 11.0663 | 41.4526 | 9.0297 |
| For Of Loop | 11.5406 | 63.0163 | 9.6016 |
| Map | 16.7597 | 27.9234 | 15.0919 |
| Filter | 22.1814 | 49.3056 | 17.2192 |
| forEach | 18.2457 | 47.8687 | 15.7463 |


### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 14.6239 | 60.6764 | 10.3677 |
| Preallocated For Loop | 6.5297 | 39.3162 | 4.9250 |
| Reverse For Loop | 17.9900 | 80.3119 | 10.2204 |
| For Of Loop | 17.5633 | 83.2431 | 11.5322 |
| Map | 15.4868 | 68.1544 | 13.1422 |
| Filter | 30.4848 | 193.2668 | 19.8258 |
| forEach | 30.9202 | 302.2497 | 19.8651 |


### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 13.7133 | 49.7699 | 10.9559 |
| Preallocated For Loop | 14.0347 | 44.1103 | 9.8493 |
| Reverse For Loop | 14.4266 | 46.0975 | 10.7101 |
| For Of Loop | 14.9466 | 49.8044 | 11.8778 |
| Map | 24.1846 | 34.4497 | 19.4718 |
| Filter | 22.8034 | 28.9696 | 19.3658 |
| forEach | 20.2917 | 60.6871 | 17.0919 |

# 100 runs of 100,000 items (Chrome v110 on i7-9700F @ 3.00GHz)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.7250 | 3.9000 | 0.4000 |
| Preallocated For Loop | 0.6220 | 3.2000 | 0.4000 |
| Reverse For Loop | 0.7930 | 3.4000 | 0.4000 |
| For Of Loop | 0.8200 | 6.3000 | 0.4000 |
| Map | 1.3290 | 2.0000 | 1.2000 |
| Filter | 1.5300 | 3.7000 | 1.2000 |
| forEach | 1.3980 | 3.9000 | 1.1000 |

### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.0490 | 4.5000 | 0.6000 |
| Preallocated For Loop | 0.7910 | 3.7000 | 0.5000 |
| Reverse For Loop | 0.9750 | 3.6000 | 0.6000 |
| For Of Loop | 1.0310 | 6.3000 | 0.6000 |
| Map | 1.4750 | 3.4000 | 1.3000 |
| Filter | 1.7740 | 10.2000 | 1.3000 |
| forEach | 1.7740 | 22.9000 | 1.2000 |

### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.8720 | 6.0000 | 0.4000 |
| Preallocated For Loop | 0.6320 | 4.3000 | 0.4000 |
| Reverse For Loop | 0.7760 | 3.5000 | 0.5000 |
| For Of Loop | 0.9180 | 6.4000 | 0.5000 |
| Map | 1.3760 | 2.6000 | 1.2000 |
| Filter | 1.5330 | 4.1000 | 1.2000 |
| forEach | 1.3310 | 3.4000 | 1.1000 |

### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.0690 | 6.3000 | 0.6000 |
| Preallocated For Loop | 0.8230 | 4.2000 | 0.6000 |
| Reverse For Loop | 0.9740 | 3.8000 | 0.6000 |
| For Of Loop | 1.0060 | 5.6000 | 0.7000 |
| Map | 1.4780 | 4.5000 | 1.2000 |
| Filter | 1.6640 | 4.1000 | 1.4000 |
| forEach | 1.5340 | 4.1000 | 1.2000 |


# 100 runs of 100,000 items (Firefox v109 on i7-9700F @ 3.00GHz)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.0600 | 3.0000 | 0.0000 |
| Preallocated For Loop | 0.9900 | 2.0000 | 0.0000 |
| Reverse For Loop | 0.9900 | 2.0000 | 0.0000 |
| For Of Loop | 1.6700 | 5.0000 | 0.0000 |
| Map | 1.2000 | 2.0000 | 0.0000 |
| Filter | 1.6100 | 3.0000 | 0.0000 |
| forEach | 1.7800 | 3.0000 | 0.0000 |

### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.3500 | 2.0000 | 0.0000 |
| Preallocated For Loop | 1.3700 | 3.0000 | 0.0000 |
| Reverse For Loop | 1.2300 | 2.0000 | 0.0000 |
| For Of Loop | 1.9000 | 3.0000 | 0.0000 |
| Map | 1.2300 | 2.0000 | 0.0000 |
| Filter | 1.7800 | 3.0000 | 0.0000 |
| forEach | 1.9500 | 4.0000 | 0.0000 |

### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.0800 | 2.0000 | 0.0000 |
| Preallocated For Loop | 1.4100 | 3.0000 | 0.0000 |
| Reverse For Loop | 1.0500 | 2.0000 | 0.0000 |
| For Of Loop | 1.4900 | 5.0000 | 0.0000 |
| Map | 1.2000 | 2.0000 | 0.0000 |
| Filter | 1.6400 | 3.0000 | 0.0000 |
| forEach | 1.7500 | 3.0000 | 0.0000 |

### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.4100 | 3.0000 | 0.0000 |
| Preallocated For Loop | 1.5700 | 3.0000 | 0.0000 |
| Reverse For Loop | 1.4800 | 3.0000 | 0.0000 |
| For Of Loop | 1.9300 | 3.0000 | 1.0000 |
| Map | 1.3100 | 3.0000 | 0.0000 |
| Filter | 1.9200 | 3.0000 | 1.0000 |
| forEach | 1.9000 | 3.0000 | 1.0000 |

# 100 runs of 100,000 items (Chrome v110 on M1)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.6730 | 2.6000 | 0.4000 |
| Preallocated For Loop | 0.5870 | 2.3000 | 0.4000 |
| Reverse For Loop | 0.6390 | 2.4000 | 0.4000 |
| For Of Loop | 0.7800 | 4.1000 | 0.4000 |
| Map | 1.2790 | 1.5000 | 1.1000 |
| Filter | 1.5310 | 9.6000 | 1.3000 |
| forEach | 1.2720 | 2.6000 | 1.1000 |

### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.8270 | 3.0000 | 0.5000 |
| Preallocated For Loop | 0.6810 | 2.6000 | 0.5000 |
| Reverse For Loop | 0.8070 | 4.1000 | 0.5000 |
| For Of Loop | 0.9170 | 5.2000 | 0.5000 |
| Map | 1.4180 | 3.4000 | 1.2000 |
| Filter | 1.5350 | 3.1000 | 1.3000 |
| forEach | 1.3860 | 2.8000 | 1.1000 |

### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.6520 | 4.4000 | 0.4000 |
| Preallocated For Loop | 0.5950 | 2.6000 | 0.4000 |
| Reverse For Loop | 0.6600 | 2.5000 | 0.4000 |
| For Of Loop | 0.7510 | 4.7000 | 0.5000 |
| Map | 1.2900 | 1.6000 | 1.2000 |
| Filter | 1.4480 | 3.0000 | 1.2000 |
| forEach | 1.2530 | 2.7000 | 1.0000 |

### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 0.8680 | 3.1000 | 0.6000 |
| Preallocated For Loop | 0.6830 | 2.7000 | 0.5000 |
| Reverse For Loop | 0.7890 | 2.9000 | 0.5000 |
| For Of Loop | 0.7810 | 3.7000 | 0.6000 |
| Map | 1.3480 | 1.6000 | 1.2000 |
| Filter | 1.4440 | 2.7000 | 1.3000 |
| forEach | 1.4410 | 10.9000 | 1.1000 |

# 100 runs of 100,000 items (Safari v16.1 on M1)

### Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.5300 | 8.0000 | 1.0000 |
| Preallocated For Loop | 1.5400 | 9.0000 | 1.0000 |
| Reverse For Loop | 2.8600 | 9.0000 | 2.0000 |
| For Of Loop | 8.7400 | 11.0000 | 6.0000 |
| Map | 1.1600 | 3.0000 | 0.0000 |
| Filter | 1.6600 | 4.0000 | 1.0000 |
| forEach | 1.4900 | 5.0000 | 1.0000 |

### Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 2.0400 | 9.0000 | 1.0000 |
| Preallocated For Loop | 1.6800 | 10.0000 | 1.0000 |
| Reverse For Loop | 3.1000 | 9.0000 | 2.0000 |
| For Of Loop | 9.1800 | 11.0000 | 1.0000 |
| Map | 1.2500 | 3.0000 | 1.0000 |
| Filter | 1.9300 | 4.0000 | 1.0000 |
| forEach | 2.1500 | 5.0000 | 1.0000 |

### Global Integer Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 1.9200 | 10.0000 | 1.0000 |
| Preallocated For Loop | 1.4700 | 5.0000 | 1.0000 |
| Reverse For Loop | 2.7800 | 9.0000 | 2.0000 |
| For Of Loop | 8.5400 | 11.0000 | 7.0000 |
| Map | 1.2400 | 3.0000 | 0.0000 |
| Filter | 1.7100 | 4.0000 | 1.0000 |
| forEach | 1.7100 | 5.0000 | 1.0000 |

### Global Object Array

| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | 2.1400 | 9.0000 | 1.0000 |
| Preallocated For Loop | 1.6000 | 4.0000 | 1.0000 |
| Reverse For Loop | 2.7100 | 4.0000 | 2.0000 |
| For Of Loop | 7.3000 | 10.0000 | 1.0000 |
| Map | 1.6600 | 4.0000 | 1.0000 |
| Filter | 2.0600 | 4.0000 | 1.0000 |
| forEach | 2.1800 | 6.0000 | 1.0000 |
