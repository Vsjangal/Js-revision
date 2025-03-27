// console.log("hello world!");

// polyfills 

// 1. map function

Array.prototype.mymap = function (fn) { 
    if (typeof fn !== "function") {
        throw new TypeError("map() expects a function argument");
    }

    let results = [];
    for (let i = 0; i < this.length; i++) { 
        results.push(fn(this[i]));
    }
    return results;
}

// const number = [1, 2, 3, 4, 5];
// console.log(number.mymap(x => x * 2));

// 2. filter function

Array.prototype.myfilter = function (fn) {
    if (typeof fn !== "function") {
        throw new TypeError("filter expects functional arguement");
    }

    let results = [];
    for (let i = 0; i < this.length; i++){
        if (fn(this[i])) {
            results.push(this[i]);
        }
    }
    return results;
}

// const number = [1, 2, 3, 4, 5];

// console.log(number.myfilter((x) => x > 3));

// 3. reduce function

Array.prototype.myreduce = function (fn, initialValue) {
    if (typeof fn !== "function") {
        throw new TypeError("reduce expects first parameter as function")
    }
    let startIndex;
    let acc;
    if (initialValue !== undefined) {
        acc = initialValue;
        startIndex = 0;
    }
    else {
        acc = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++){
        acc = fn(acc,this[i]);
    }
    return acc;
}

// const number = [1, 2, 3, 4, 5];
// console.log(number.myreduce(((acc, curr) => acc + curr), 0));