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

console.log("Filter");
const filterTiming = [];
const filterObjectTiming = [];
const filterGlobalTiming = [];
const filterGlobalObjectTiming = [];
for (let i = 0; i < runs; i++){
    {
        const arr = generateRandomIntegerArray(arrLength, 0, 100_000);
        const startTime = performance.now();
        const res = arr.filter((item) => item % 2 === 0);
        const stopTime = performance.now();
        filterTiming.push(stopTime - startTime);
    }
    {
        const arr = generateRandomObjectArray(arrLength, 0, 100_000);
        const startTime = performance.now();
        const res = arr.filter((item) => item.age % 2 === 0);
        const stopTime = performance.now();
        filterObjectTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = globalIntegerArray.filter((item) => item % 2 === 0);
        const stopTime = performance.now();
        filterGlobalTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = globalObjectArray.filter((item) => item.age % 2 === 0);
        const stopTime = performance.now();
        filterGlobalObjectTiming.push(stopTime - startTime);
    }
}

console.log("For Loop");
const forLoopTiming = [];
const forLoopObjectTiming = [];
const forLoopGlobalTiming = [];
const forLoopGlobalObjectTiming = [];
const preallocatedForLoopTiming = [];
const preallocatedForLoopObjectTiming = [];
const preallocatedForLoopGlobalTiming = [];
const preallocatedForLoopGlobalObjectTiming = [];
for (let i = 0; i < runs; i++){
    {
        const arr = generateRandomIntegerArray(arrLength, 0, 100_000);
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
    {
        const arr = generateRandomObjectArray(arrLength, 0, 100_000);
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
    {
        const startTime = performance.now();
        const res = [];
        for (let i = 0; i < globalIntegerArray.length; i++) {
            if (globalIntegerArray[i] % 2 === 0) {
                res.push(globalIntegerArray[i]);
            }
        }
        const stopTime = performance.now();
        forLoopGlobalTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = [];
        for (let i = 0; i < globalObjectArray.length; i++) {
            if (globalObjectArray[i].age % 2 === 0) {
                res.push(globalObjectArray[i]);
            }
        }
        const stopTime = performance.now();
        forLoopGlobalObjectTiming.push(stopTime - startTime);
    }
    {
        const arr = generateRandomIntegerArray(arrLength, 0, 100_000);
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
    {
        const arr = generateRandomObjectArray(arrLength, 0, 100_000);
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
    {
        const startTime = performance.now();
        const res = new Array(arrLength);
        let index = 0;
        for (let i = 0; i < globalIntegerArray.length; i++) {
            if (globalIntegerArray[i] % 2 === 0) {
                res[index] = globalIntegerArray[i];
                index++;
            }
        }
        const stopTime = performance.now();
        preallocatedForLoopGlobalTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = new Array(arrLength);
        let index = 0;
        for (let i = 0; i < globalObjectArray.length; i++) {
            if (globalObjectArray[i].age % 2 === 0) {
                res[index] = globalObjectArray[i];
                index++;
            }
        }
        const stopTime = performance.now();
        preallocatedForLoopGlobalObjectTiming.push(stopTime - startTime);
    }
}

console.log("Reverse For Loop");
const reverseForLoopTiming = [];
const reverseForLoopObjectTiming = [];
const reverseForLoopGlobalTiming = [];
const reverseForLoopGlobalObjectTiming = [];
for (let i = 0; i < runs; i++){
    {
        const arr = generateRandomIntegerArray(arrLength, 0, 100_000);
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
    {
        const arr = generateRandomObjectArray(arrLength, 0, 100_000);
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
    {
        const startTime = performance.now();
        const res = [];
        for (let i = globalIntegerArray.length - 1; i >= 0; i--) {
            if (globalIntegerArray[i] % 2 === 0) {
                res.push(globalIntegerArray[i]);
            }
        }
        const stopTime = performance.now();
        reverseForLoopGlobalTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = [];
        for (let i = globalObjectArray.length - 1; i >= 0; i--) {
            if (globalObjectArray[i].age % 2 === 0) {
                res.push(globalObjectArray[i]);
            }
        }
        const stopTime = performance.now();
        reverseForLoopGlobalObjectTiming.push(stopTime - startTime);
    }
}

console.log("For Of Loop");
const forOfLoopTiming = [];
const forOfLoopObjectTiming = [];
const forOfLoopGlobalTiming = [];
const forOfLoopGlobalObjectTiming = [];
for (let i = 0; i < runs; i++){
    {
        const arr = generateRandomIntegerArray(arrLength, 0, 100_000);
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
    {
        const arr = generateRandomObjectArray(arrLength, 0, 100_000);
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
    {
        const startTime = performance.now();
        const res = [];
        for (const item of globalIntegerArray) {
            if (item % 2 === 0) {
                res.push(item);
            }
        }
        const stopTime = performance.now();
        forOfLoopGlobalTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = [];
        for (const item of globalObjectArray) {
            if (item.age % 2 === 0) {
                res.push(item);
            }
        }
        const stopTime = performance.now();
        forOfLoopGlobalObjectTiming.push(stopTime - startTime);
    }
}

console.log("Map");
const mapTiming = [];
const mapObjectTiming = [];
const mapGlobalTiming = [];
const mapGlobalObjectTiming = [];
for (let i = 0; i < runs; i++){
    {
        const arr = generateRandomIntegerArray(arrLength, 0, 100_000);
        const startTime = performance.now();
        const res = arr.map((item) => item % 2 === 0);
        const stopTime = performance.now();
        mapTiming.push(stopTime - startTime);
    }
    {
        const arr = generateRandomObjectArray(arrLength, 0, 100_000);
        const startTime = performance.now();
        const res = arr.map((item) => item.age % 2 === 0);
        const stopTime = performance.now();
        mapObjectTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = globalIntegerArray.map((item) => item % 2 === 0);
        const stopTime = performance.now();
        mapGlobalTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = globalObjectArray.map((item) => item.age % 2 === 0);
        const stopTime = performance.now();
        mapGlobalObjectTiming.push(stopTime - startTime);
    }
}

console.log("forEach");
const forEachTiming = [];
const forEachObjectTiming = [];
const forEachGlobalTiming = [];
const forEachGlobalObjectTiming = [];
for (let i = 0; i < runs; i++){
    {
        const arr = generateRandomIntegerArray(arrLength, 0, 100_000);
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
    {
        const arr = generateRandomObjectArray(arrLength, 0, 100_000);
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
    {
        const startTime = performance.now();
        const res = [];
        globalIntegerArray.forEach((item) => {
            if (item % 2 === 0) {
                res.push(item);
            }
        });
        const stopTime = performance.now();
        forEachGlobalTiming.push(stopTime - startTime);
    }
    {
        const startTime = performance.now();
        const res = [];
        globalObjectArray.forEach((item) => {
            if (item.age % 2 === 0) {
                res.push(item);
            }
        });
        const stopTime = performance.now();
        forEachGlobalObjectTiming.push(stopTime - startTime);
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
console.log("");
console.log(`# ${runs} runs of ${arrLength} items`);
console.log("");
console.log(`### Integer Array`);
console.log(`
| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | ${average(forLoopTiming).toFixed(4)} | ${max(forLoopTiming).toFixed(4)} | ${min(forLoopTiming).toFixed(4)} |
| Preallocated For Loop | ${average(preallocatedForLoopTiming).toFixed(4)} | ${max(preallocatedForLoopTiming).toFixed(4)} | ${min(preallocatedForLoopTiming).toFixed(4)} |
| Reverse For Loop | ${average(reverseForLoopTiming).toFixed(4)} | ${max(reverseForLoopTiming).toFixed(4)} | ${min(reverseForLoopTiming).toFixed(4)} |
| For Of Loop | ${average(forOfLoopTiming).toFixed(4)} | ${max(forOfLoopTiming).toFixed(4)} | ${min(forOfLoopTiming).toFixed(4)} |
| Map | ${average(mapTiming).toFixed(4)} | ${max(mapTiming).toFixed(4)} | ${min(mapTiming).toFixed(4)} |
| Filter | ${average(filterTiming).toFixed(4)} | ${max(filterTiming).toFixed(4)} | ${min(filterTiming).toFixed(4)} |
| forEach | ${average(forEachTiming).toFixed(4)} | ${max(forEachTiming).toFixed(4)} | ${min(forEachTiming).toFixed(4)} |
`);
console.log("");
console.log(`### Object Array`);
console.log(`
| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | ${average(forLoopObjectTiming).toFixed(4)} | ${max(forLoopObjectTiming).toFixed(4)} | ${min(forLoopObjectTiming).toFixed(4)} |
| Preallocated For Loop | ${average(preallocatedForLoopObjectTiming).toFixed(4)} | ${max(preallocatedForLoopObjectTiming).toFixed(4)} | ${min(preallocatedForLoopObjectTiming).toFixed(4)} |
| Reverse For Loop | ${average(reverseForLoopObjectTiming).toFixed(4)} | ${max(reverseForLoopObjectTiming).toFixed(4)} | ${min(reverseForLoopObjectTiming).toFixed(4)} |
| For Of Loop | ${average(forOfLoopObjectTiming).toFixed(4)} | ${max(forOfLoopObjectTiming).toFixed(4)} | ${min(forOfLoopObjectTiming).toFixed(4)} |
| Map | ${average(mapObjectTiming).toFixed(4)} | ${max(mapObjectTiming).toFixed(4)} | ${min(mapObjectTiming).toFixed(4)} |
| Filter | ${average(filterObjectTiming).toFixed(4)} | ${max(filterObjectTiming).toFixed(4)} | ${min(filterObjectTiming).toFixed(4)} |
| forEach | ${average(forEachObjectTiming).toFixed(4)} | ${max(forEachObjectTiming).toFixed(4)} | ${min(forEachObjectTiming).toFixed(4)} |
`);
console.log("");
console.log(`### Global Integer Array`);
console.log(`
| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | ${average(forLoopGlobalTiming).toFixed(4)} | ${max(forLoopGlobalTiming).toFixed(4)} | ${min(forLoopGlobalTiming).toFixed(4)} |
| Preallocated For Loop | ${average(preallocatedForLoopGlobalTiming).toFixed(4)} | ${max(preallocatedForLoopGlobalTiming).toFixed(4)} | ${min(preallocatedForLoopGlobalTiming).toFixed(4)} |
| Reverse For Loop | ${average(reverseForLoopGlobalTiming).toFixed(4)} | ${max(reverseForLoopGlobalTiming).toFixed(4)} | ${min(reverseForLoopGlobalTiming).toFixed(4)} |
| For Of Loop | ${average(forOfLoopGlobalTiming).toFixed(4)} | ${max(forOfLoopGlobalTiming).toFixed(4)} | ${min(forOfLoopGlobalTiming).toFixed(4)} |
| Map | ${average(mapGlobalTiming).toFixed(4)} | ${max(mapGlobalTiming).toFixed(4)} | ${min(mapGlobalTiming).toFixed(4)} |
| Filter | ${average(filterGlobalTiming).toFixed(4)} | ${max(filterGlobalTiming).toFixed(4)} | ${min(filterGlobalTiming).toFixed(4)} |
| forEach | ${average(forEachGlobalTiming).toFixed(4)} | ${max(forEachGlobalTiming).toFixed(4)} | ${min(forEachGlobalTiming).toFixed(4)} |
`);
console.log("");
console.log(`### Global Object Array`);
console.log(`
| Type | Average | Max | Min |
| --- | --- | --- | --- |
| For Loop | ${average(forLoopGlobalObjectTiming).toFixed(4)} | ${max(forLoopGlobalObjectTiming).toFixed(4)} | ${min(forLoopGlobalObjectTiming).toFixed(4)} |
| Preallocated For Loop | ${average(preallocatedForLoopGlobalObjectTiming).toFixed(4)} | ${max(preallocatedForLoopGlobalObjectTiming).toFixed(4)} | ${min(preallocatedForLoopGlobalObjectTiming).toFixed(4)} |
| Reverse For Loop | ${average(reverseForLoopGlobalObjectTiming).toFixed(4)} | ${max(reverseForLoopGlobalObjectTiming).toFixed(4)} | ${min(reverseForLoopGlobalObjectTiming).toFixed(4)} |
| For Of Loop | ${average(forOfLoopGlobalObjectTiming).toFixed(4)} | ${max(forOfLoopGlobalObjectTiming).toFixed(4)} | ${min(forOfLoopGlobalObjectTiming).toFixed(4)} |
| Map | ${average(mapGlobalObjectTiming).toFixed(4)} | ${max(mapGlobalObjectTiming).toFixed(4)} | ${min(mapGlobalObjectTiming).toFixed(4)} |
| Filter | ${average(filterGlobalObjectTiming).toFixed(4)} | ${max(filterGlobalObjectTiming).toFixed(4)} | ${min(filterGlobalObjectTiming).toFixed(4)} |
| forEach | ${average(forEachGlobalObjectTiming).toFixed(4)} | ${max(forEachGlobalObjectTiming).toFixed(4)} | ${min(forEachGlobalObjectTiming).toFixed(4)} |
`);

