const runs = +process.argv[2] || 100;
const arrLength = +process.argv[3] || 100_000;

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
const forLoopMaxTiming = [];
const forLoopMaxObjectTiming = [];
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
        forLoopMaxTiming.push(stopTime - startTime);
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
        forLoopMaxObjectTiming.push(stopTime - startTime);
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
console.log("---");
console.log("Int Array");
console.log("Average Filter", average(filterTiming), "Max", max(filterTiming), "Min", min(filterTiming));
console.log("Average For Loop", average(forLoopTiming), "Max", max(forLoopTiming), "Min", min(forLoopTiming));
console.log("Average Reverse For Loop", average(reverseForLoopTiming), "Max", max(reverseForLoopTiming), "Min", min(reverseForLoopTiming));
console.log("Average For Of Loop", average(forOfLoopTiming), "Max", max(forOfLoopTiming), "Min", min(forOfLoopTiming));
console.log("Average Map", average(mapTiming), "Max", max(mapTiming), "Min", min(mapTiming));
console.log("Average forEach", average(forEachTiming), "Max", max(forEachTiming), "Min", min(forEachTiming));
console.log("Average For Loop Preallocated", average(forLoopMaxTiming), "Max", max(forLoopMaxTiming), "Min", min(forLoopMaxTiming));
console.log("---");
console.log("Global Int Array");
console.log("Average Filter", average(filterGlobalTiming), "Max", max(filterGlobalTiming), "Min", min(filterGlobalTiming));
console.log("Average For Loop", average(forLoopGlobalTiming), "Max", max(forLoopGlobalTiming), "Min", min(forLoopGlobalTiming));
console.log("Average Reverse For Loop", average(reverseForLoopGlobalTiming), "Max", max(reverseForLoopGlobalTiming), "Min", min(reverseForLoopGlobalTiming));
console.log("Average For Of Loop", average(forOfLoopGlobalTiming), "Max", max(forOfLoopGlobalTiming), "Min", min(forOfLoopGlobalTiming));
console.log("Average Map", average(mapGlobalTiming), "Max", max(mapGlobalTiming), "Min", min(mapGlobalTiming));
console.log("Average forEach", average(forEachGlobalTiming), "Max", max(forEachGlobalTiming), "Min", min(forEachGlobalTiming));
console.log("---");
console.log("Object Array");
console.log("Average Filter", average(filterObjectTiming), "Max", max(filterObjectTiming), "Min", min(filterObjectTiming));
console.log("Average For Loop", average(forLoopObjectTiming), "Max", max(forLoopObjectTiming), "Min", min(forLoopObjectTiming));
console.log("Average Reverse For Loop", average(reverseForLoopObjectTiming), "Max", max(reverseForLoopObjectTiming), "Min", min(reverseForLoopObjectTiming));
console.log("Average For Of Loop", average(forOfLoopObjectTiming), "Max", max(forOfLoopObjectTiming), "Min", min(forOfLoopObjectTiming));
console.log("Average Map", average(mapObjectTiming), "Max", max(mapObjectTiming), "Min", min(mapObjectTiming));
console.log("Average forEach", average(forEachObjectTiming), "Max", max(forEachObjectTiming), "Min", min(forEachObjectTiming));
console.log("Average For Loop Preallocated", average(forLoopMaxObjectTiming), "Max", max(forLoopMaxObjectTiming), "Min", min(forLoopMaxObjectTiming));
console.log("---");
console.log("Global Object Array");
console.log("Average Filter", average(filterGlobalObjectTiming), "Max", max(filterGlobalObjectTiming), "Min", min(filterGlobalObjectTiming));
console.log("Average For Loop", average(forLoopGlobalObjectTiming), "Max", max(forLoopGlobalObjectTiming), "Min", min(forLoopGlobalObjectTiming));
console.log("Average Reverse For Loop", average(reverseForLoopGlobalObjectTiming), "Max", max(reverseForLoopGlobalObjectTiming), "Min", min(reverseForLoopGlobalObjectTiming));
console.log("Average For Of Loop", average(forOfLoopGlobalObjectTiming), "Max", max(forOfLoopGlobalObjectTiming), "Min", min(forOfLoopGlobalObjectTiming));
console.log("Average Map", average(mapGlobalObjectTiming), "Max", max(mapGlobalObjectTiming), "Min", min(mapGlobalObjectTiming));
console.log("Average forEach", average(forEachGlobalObjectTiming), "Max", max(forEachGlobalObjectTiming), "Min", min(forEachGlobalObjectTiming));

