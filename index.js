let runs = 100;
let arrLength = 100_000;

if (typeof process !== "undefined" && process?.argv?.length > 2) {
    runs = parseInt(process.argv[2]);
    arrLength = parseInt(process.argv[3]);
} else if (typeof window !== "undefined" && window?.location?.search) {
    const params = new URLSearchParams(window.location.search);
    runs = parseInt(params.get("runs"));
    arrLength = parseInt(params.get("arrLength"));
}

function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomObjectArray(length, min, max) {
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push({
            id: generateRandomInteger(min, max),
            name: `name-${generateRandomInteger(min, max)}`,
            age: generateRandomInteger(min, max),
        });
    }
    return result;
}

function generateRandomIntegerArray(length, min, max) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(generateRandomInteger(min, max));
  }
  return result;
}

const globalIntegerArray = generateRandomIntegerArray(arrLength, 0, 100_000);
const globalObjectArray = generateRandomObjectArray(arrLength, 0, 100_000);
const intArrays = new Array(runs);
const objectArrays = new Array(runs);

for (let i = 0; i < runs; i++){
    intArrays[i] = generateRandomIntegerArray(arrLength, 0, 100_000);
    objectArrays[i] = generateRandomObjectArray(arrLength, 0, 100_000);
}

console.log("Starting test");
const filterTiming = [];
const filterObjectTiming = [];
const filterGlobalTiming = [];
const filterGlobalObjectTiming = [];
const forLoopTiming = [];
const forLoopObjectTiming = [];
const preallocatedForLoopTiming = [];
const preallocatedForLoopObjectTiming = [];
const reverseForLoopTiming = [];
const reverseForLoopObjectTiming = [];
const forOfLoopTiming = [];
const forOfLoopObjectTiming = [];
const mapTiming = [];
const mapObjectTiming = [];
const forEachTiming = [];
const forEachObjectTiming = [];
const optimizedForLoopTiming = [];
const optimziedForLoopObjectTiming = [];

for (let i = 0; i < intArrays.length; i++){
    const arr = intArrays[i];
    // Filter
    {
        const startTime = performance.now();
        const res = arr.filter((item) => item % 2 === 0);
        const stopTime = performance.now();
        filterTiming.push(stopTime - startTime);
    }
    // For Loop
    {
        const startTime = performance.now();
        const res = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 2 === 0) {
                res.push(arr[i]);
            }
        }
        const stopTime = performance.now();
        forLoopTiming.push(stopTime - startTime);
    }
    // Optimzied For Loop
    {
        const startTime = performance.now();
        const res = [];
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            if (arr[i] % 2 === 0) {
                res.push(arr[i]);
            }
        }
        const stopTime = performance.now();
        optimizedForLoopTiming.push(stopTime - startTime);
    }
    // Preallocated For Loop
    {
        const startTime = performance.now();
        const res = new Array(arrLength);
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 2 === 0) {
                res[index] = arr[i];
                index++;
            }
        }
        const stopTime = performance.now();
        preallocatedForLoopTiming.push(stopTime - startTime);
    }
    // Reverse For Lopp
    {
        const startTime = performance.now();
        const res = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] % 2 === 0) {
                res.push(arr[i]);
            }
        }
        const stopTime = performance.now();
        reverseForLoopTiming.push(stopTime - startTime);
    }
    // For Of Loop
    {
        const startTime = performance.now();
        const res = [];
        for (const item of arr) {
            if (item % 2 === 0) {
                res.push(item);
            }
        }
        const stopTime = performance.now();
        forOfLoopTiming.push(stopTime - startTime);
    }
    // Map
    {
        const startTime = performance.now();
        const res = arr.map((item) => item % 2 === 0);
        const stopTime = performance.now();
        mapTiming.push(stopTime - startTime);
    }
    // For Each
    {
        const startTime = performance.now();
        const res = [];
        arr.forEach((item) => {
            if (item % 2 === 0) {
                res.push(item);
            }
        });
        const stopTime = performance.now();
        forEachTiming.push(stopTime - startTime);
    }
}
for (let i = 0; i < objectArrays.length; i++){
    const arr = objectArrays[i];
    // Filter
    {
        const startTime = performance.now();
        const res = arr.filter((item) => item.age % 2 === 0);
        const stopTime = performance.now();
        filterObjectTiming.push(stopTime - startTime);
    }
    // For Loop
    {
        const startTime = performance.now();
        const res = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].age % 2 === 0) {
                res.push(arr[i]);
            }
        }
        const stopTime = performance.now();
        forLoopObjectTiming.push(stopTime - startTime);
    }
    // Optimzied For Loop
    {
        const startTime = performance.now();
        const res = [];
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            if (arr[i].age % 2 === 0) {
                res.push(arr[i]);
            }
        }
        const stopTime = performance.now();
        optimziedForLoopObjectTiming.push(stopTime - startTime);
    }
    // Preallocated For Loop
    {
        const startTime = performance.now();
        const res = new Array(arrLength);
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].age % 2 === 0) {
                res[index] = arr[i];
                index++;
            }
        }
        const stopTime = performance.now();
        preallocatedForLoopObjectTiming.push(stopTime - startTime);
    }
    // Reverse For Loop
    {
        const startTime = performance.now();
        const res = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].age % 2 === 0) {
                res.push(arr[i]);
            }
        }
        const stopTime = performance.now();
        reverseForLoopObjectTiming.push(stopTime - startTime);
    }
    // For Of Loop
    {
        const startTime = performance.now();
        const res = [];
        for (const item of arr) {
            if (item.age % 2 === 0) {
                res.push(item);
            }
        }
        const stopTime = performance.now();
        forOfLoopObjectTiming.push(stopTime - startTime);
    }
    // Map
    {
        const startTime = performance.now();
        const res = arr.map((item) => item.age % 2 === 0);
        const stopTime = performance.now();
        mapObjectTiming.push(stopTime - startTime);
    }
    // For Each
    {
        const startTime = performance.now();
        const res = [];
        arr.forEach((item) => {
            if (item.age % 2 === 0) {
                res.push(item);
            }
        });
        const stopTime = performance.now();
        forEachObjectTiming.push(stopTime - startTime);
    }
}

function average(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
}

function max(arr) {
    return Math.max(...arr);
}

function min(arr) {
    return Math.min(...arr);
}

function sum(arr){
    return arr.reduce((acc, a) => acc + a, 0);
}

console.log(`
# ${Intl.NumberFormat("en-US").format(runs)} runs of ${Intl.NumberFormat("en-US").format(arrLength)} items

### Integer Array

| Type | Average | Max | Min | Total |
| --- | --- | --- | --- | --- |
| For Loop | ${average(forLoopTiming).toFixed(4)} | ${max(forLoopTiming).toFixed(4)} | ${min(forLoopTiming).toFixed(4)} | ${sum(forLoopTiming).toFixed(4)} |
| Preallocated For | ${average(preallocatedForLoopTiming).toFixed(4)} | ${max(preallocatedForLoopTiming).toFixed(4)} | ${min(preallocatedForLoopTiming).toFixed(4)} | ${sum(preallocatedForLoopTiming).toFixed(4)} |
| Optimized For | ${average(optimizedForLoopTiming).toFixed(4)} | ${max(optimizedForLoopTiming).toFixed(4)} | ${min(optimizedForLoopTiming).toFixed(4)} | ${sum(optimizedForLoopTiming).toFixed(4)} |
| Reverse For | ${average(reverseForLoopTiming).toFixed(4)} | ${max(reverseForLoopTiming).toFixed(4)} | ${min(reverseForLoopTiming).toFixed(4)} | ${sum(reverseForLoopTiming).toFixed(4)} |
| For Of | ${average(forOfLoopTiming).toFixed(4)} | ${max(forOfLoopTiming).toFixed(4)} | ${min(forOfLoopTiming).toFixed(4)} | ${sum(forOfLoopTiming).toFixed(4)} |
| Map | ${average(mapTiming).toFixed(4)} | ${max(mapTiming).toFixed(4)} | ${min(mapTiming).toFixed(4)} | ${sum(mapTiming).toFixed(4)} |
| Filter | ${average(filterTiming).toFixed(4)} | ${max(filterTiming).toFixed(4)} | ${min(filterTiming).toFixed(4)} | ${sum(filterTiming).toFixed(4)} |
| For Each | ${average(forEachTiming).toFixed(4)} | ${max(forEachTiming).toFixed(4)} | ${min(forEachTiming).toFixed(4)} | ${sum(forEachTiming).toFixed(4)} |

### Object Array

| Type | Average | Max | Min | Total |
| --- | --- | --- | --- | --- |
| For Loop | ${average(forLoopObjectTiming).toFixed(4)} | ${max(forLoopObjectTiming).toFixed(4)} | ${min(forLoopObjectTiming).toFixed(4)} | ${sum(forLoopObjectTiming).toFixed(4)} |
| Preallocated For | ${average(preallocatedForLoopObjectTiming).toFixed(4)} | ${max(preallocatedForLoopObjectTiming).toFixed(4)} | ${min(preallocatedForLoopObjectTiming).toFixed(4)} | ${sum(preallocatedForLoopObjectTiming).toFixed(4)} |
| Optimized For | ${average(optimziedForLoopObjectTiming).toFixed(4)} | ${max(optimizedForLoopObjectTiming).toFixed(4)} | ${min(optimizedForLoopObjectTiming).toFixed(4)} | ${sum(optimizedForLoopObjectTiming).toFixed(4)} |
| Reverse For | ${average(reverseForLoopObjectTiming).toFixed(4)} | ${max(reverseForLoopObjectTiming).toFixed(4)} | ${min(reverseForLoopObjectTiming).toFixed(4)} | ${sum(reverseForLoopObjectTiming).toFixed(4)} |
| For Of | ${average(forOfLoopObjectTiming).toFixed(4)} | ${max(forOfLoopObjectTiming).toFixed(4)} | ${min(forOfLoopObjectTiming).toFixed(4)} | ${sum(forOfLoopObjectTiming).toFixed(4)} |
| Map | ${average(mapObjectTiming).toFixed(4)} | ${max(mapObjectTiming).toFixed(4)} | ${min(mapObjectTiming).toFixed(4)} | ${sum(mapObjectTiming).toFixed(4)} |
| Filter | ${average(filterObjectTiming).toFixed(4)} | ${max(filterObjectTiming).toFixed(4)} | ${min(filterObjectTiming).toFixed(4)} | ${sum(filterObjectTiming).toFixed(4)} |
| For Each | ${average(forEachObjectTiming).toFixed(4)} | ${max(forEachObjectTiming).toFixed(4)} | ${min(forEachObjectTiming).toFixed(4)} | ${sum(forEachObjectTiming).toFixed(4)} |
`);

