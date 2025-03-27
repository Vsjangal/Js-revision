// throttle debounce curry promise and promise all 

// 1. debounce 

function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        },delay)
    }
}
// function fetchData() {
//   console.log("Fetching data...");
// }

// const debouncedFetch = debounce(fetchData, 1000);

// debouncedFetch();
// debouncedFetch();

// 2 . throttle

function throttle(fn, wait) {
    let lastcall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastcall >= wait) {
            lastcall = now
            fn.apply(this, args);
        }
    }
}
// function fetchData() {
//   console.log("Fetching data...", new Date().toLocaleTimeString());
// }

// const throttledFetch = throttle(fetchData, 2000);

// setInterval(() => {
//   throttledFetch();
// }, 500);

// 3. Curry 

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        else {
            return (...nextargs)=> curried(...nextargs,...args)
        }
    }
}

// function sum(a, b, c) {
//     return a + b + c;
// }

// const curriedsum = curry(sum);

// console.log(curriedsum(1)(2)(3));
// console.log(curriedsum(1, 2)(3));


// 4. Promise 
class MyPromise {
  constructor(executor) {
    this.state = "pending"; // 'pending', 'fulfilled', 'rejected'
    this.value = undefined;
    this.handlers = [];
    this.catchers = [];

    const resolve = (result) => {
      if (this.state !== "pending") return;

      this.state = "fulfilled";
      this.value = result;

      this.handlers.forEach((handler) => handler(result));
    };

    const reject = (error) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.value = error;

      this.catchers.forEach((catcher) => catcher(error));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onSuccess) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        try {
          resolve(onSuccess(this.value));
        } catch (err) {
          reject(err);
        }
      } else {
        this.handlers.push((value) => {
          try {
            resolve(onSuccess(value));
          } catch (err) {
            reject(err);
          }
        });
      }
    });
  }

  catch(onFailure) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "rejected") {
        try {
          resolve(onFailure(this.value));
        } catch (err) {
          reject(err);
        }
      } else {
        this.catchers.push((error) => {
          try {
            resolve(onFailure(error));
          } catch (err) {
            reject(err);
          }
        });
      }
    });
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally();
        return value;
      },
      (error) => {
        onFinally();
        throw error;
      }
    );
  }
}
