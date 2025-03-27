// call, apply, bind

// 1. call

Function.prototype.mycall = function (context, ...args) {

    context = context || globalThis;
    let uniqueproperty = Math.random();

    while (context[uniqueproperty] !== undefined) {
        uniqueproperty = Math.random();
    }

    context[uniqueproperty] = this;
    let result = {};
    result = context[uniqueproperty](...args);
    delete context[uniqueproperty];

    return result;
}

// function greet(greet, punctutation) {
//     console.log(`${greet} ${this.name}${punctutation}`);
// }
// const person = {
//     name:"Ajay"
// }

// greet.mycall(person, "Hi", "!");

// 2. apply

Function.prototype.myapply = function (context, args) {
    if (typeof this !== "function") {
        throw new TypeError("my apply can be only applied on function");
    }

    context = context || globalThis;

    let uniqueproperty = Math.random();
    while (context[uniqueproperty] !== undefined) {
        uniqueproperty = Math.random();
    }
    context[uniqueproperty] = this;

    let result = {};
    result = context[uniqueproperty](args);
    delete context[uniqueproperty];
    return result;
}

// function sum(a, b, c) {
//   return this.prefix +(a + b + c);
// }

// let obj = { prefix: "sum " }

// console.log(sum.apply(obj, [1, 2, 3]));


// 3. bind

Function.prototype.mybind = function (context, ...args) {
    if (typeof this !== "function") {
        throw new TypeError("bind must be called on function")
    }
    context = context || globalThis;
    const fn = this;
    return function (...newargs) {
        return fn.apply(context,[...newargs,...args])
    }
}

const person = {
    name:"Ajay",
    greet: function (message) {
        return `${message}, I am ${this.name}`;
    }
}

// const helloAjay = person.greet.mybind(person, "Hello");
// console.log(helloAjay());


