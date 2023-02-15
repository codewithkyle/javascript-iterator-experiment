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

- Arrays with 100,000 random integers
- Arrays with 100,000 random objects
- Static arrays with 100,000 random integers
- Static arrays with 100,000 random objects
- Preallocated for loop inserts

My findings:

- For loops are 1 to 2 ms faster on average
- For loops are 2x faster when comparing max timings (to filter)
- Preallocated for loops provide the fastest average and min timings
- For loops are faster (avg & max) on cold starts
- Map has roughly the same timing as the average for loop when iterating through an array of objects
- Map consistently has the fastest max timings
- Map consistently has (one of) the slowest min timings
- For each loops are consistently slow

## Cold Starts

Int Array

```
Average Filter 2.441812999891117 Max 24.00499999988824 Min 1.4375999998301268
Average For Loop 0.8991229999903589 Max 10.531299999915063 Min 0.6568999998271465
Average Reverse For Loop 0.7951300000119954 Max 5.020399999804795 Min 0.6321999998763204
Average For Of Loop 0.8069610000029206 Max 4.290000000037253 Min 0.6557000000029802
Average Map 1.4716149999853223 Max 2.152599999681115 Min 1.344200000166893
Average forEach 1.9279670000635087 Max 8.807300000451505 Min 1.3174999998882413
Average For Loop Preallocated 0.672078000055626 Max 3.356500000692904 Min 0.5742000006139278
```

---

Global Int Array

```
Average Filter 1.794527000002563 Max 9.796399999409914 Min 1.4642000002786517
Average For Loop 1.1312069999799133 Max 6.052299999631941 Min 0.6850999994203448
Average Reverse For Loop 0.8041459999978542 Max 3.49930000025779 Min 0.6853000000119209
Average For Of Loop 1.2484519999288022 Max 27.970900000073016 Min 0.7598000001162291
Average Map 1.4708250000048428 Max 1.9629000006243587 Min 1.3519000001251698
Average forEach 1.8315799999516458 Max 11.25899999961257 Min 1.3295999998226762
```

---

Object Array

```
Average Filter 2.0650089999940247 Max 10.897900000214577 Min 1.5953999999910593
Average For Loop 1.7868600000441075 Max 6.737000000663102 Min 0.8604999994859099
Average Reverse For Loop 1.159002999998629 Max 4.436699999496341 Min 0.8908999999985099
Average For Of Loop 1.434670999990776 Max 10.427600000053644 Min 0.8887999998405576
Average Map 1.8324179999995978 Max 2.864199999719858 Min 1.546000000089407
Average forEach 2.15629499996081 Max 11.113799999468029 Min 1.476599999703467
Average For Loop Preallocated 1.0601030000206082 Max 4.363699999637902 Min 0.8102000001817942
```

---
Global Object Array

```
Average Filter 1.890772000029683 Max 8.560899999924004 Min 1.5832000002264977
Average For Loop 1.4986640000063927 Max 17.92310000024736 Min 0.909599999897182
Average Reverse For Loop 1.303558999961242 Max 14.371900000609457 Min 0.9126000003889203
Average For Of Loop 1.2930130000039934 Max 14.706899999640882 Min 0.9523999998345971
Average Map 1.6030699999816715 Max 2.164900000207126 Min 1.4883000003173947
Average forEach 1.7796760000102223 Max 9.088599999435246 Min 1.4472000002861023
```

## Warm Starts (after 3+ runs)

Int Array

```
Average Filter 1.9594820000045001 Max 8.651000000536442 Min 1.4521000003442168
Average For Loop 1.0053470000158995 Max 4.4018000001087785 Min 0.6593000004068017
Average Reverse For Loop 0.7514599999599159 Max 3.435600000433624 Min 0.6295999996364117
Average For Of Loop 0.8946160000469535 Max 13.00650000013411 Min 0.6614999994635582
Average Map 1.4639260000083596 Max 2.0610999995842576 Min 1.3366999998688698
Average forEach 1.6930519999749958 Max 8.775200000032783 Min 1.2987999999895692
Average For Loop Preallocated 0.6657279999833554 Max 3.4103000005707145 Min 0.5755999991670251
```

---

Global Int Array

```
Average Filter 2.019513000026345 Max 11.193400000222027 Min 1.4743999997153878
Average For Loop 1.0094300000090153 Max 11.480700000189245 Min 0.6852000001817942
Average Reverse For Loop 0.9624010000191628 Max 18.091900000348687 Min 0.6839999994263053
Average For Of Loop 1.3516669999808073 Max 39.8448999999091 Min 0.7638999996706843
Average Map 1.4564989999681712 Max 1.881000000052154 Min 1.348699999973178
Average forEach 1.7500980000384152 Max 31.238200000487268 Min 1.314699999988079
```

---

Object Array

```
Average Filter 2.250305999983102 Max 10.014999999664724 Min 1.60219999961555
Average For Loop 1.720314999939874 Max 6.665899999439716 Min 0.8698000004515052
Average Reverse For Loop 1.2322529999446123 Max 12.468799999915063 Min 0.8829000005498528
Average For Of Loop 1.5597210000548511 Max 13.949200000613928 Min 0.8855999996885657
Average Map 1.8323100000806152 Max 2.616799999959767 Min 1.534999999217689
Average forEach 2.1144640000164507 Max 10.784300000406802 Min 1.4738999996334314
Average For Loop Preallocated 1.0551659999787808 Max 4.065199999138713 Min 0.7987000001594424
```

---

Global Object Array

```
Average Filter 1.8528709999658168 Max 10.64009999949485 Min 1.5906000006943941
Average For Loop 1.5713620000053197 Max 18.287999999709427 Min 0.9068999998271465
Average Reverse For Loop 1.8859800000395626 Max 14.376400000415742 Min 0.909599999897182
Average For Of Loop 1.1634270000178366 Max 12.089100000448525 Min 0.951799999922514
Average Map 1.5976840000227093 Max 2.206800000742078 Min 1.4811000004410744
Average forEach 1.8615560000110418 Max 9.832399999722838 Min 1.4369999999180436
```
