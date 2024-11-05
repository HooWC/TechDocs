---
sidebar_position: 3
title: Front-end Promise
authors: Hoo
---

# Front-end interview Promise

- `setTimeout` executes the specified function once after a certain delay.
- `setInterval` will execute the specified function repeatedly at a fixed interval.
  
## Strict Mode
Strict Mode is a JavaScript mode introduced in ECMAScript 5 to improve the security and performance of code by eliminating some unsafe operations. When Serious Mode is enabled, the JavaScript engine executes code in a stricter manner, which reduces errors and improves maintainability.
Key features:
1. **Prevent accidental global variables**: In non-strict mode, if you do not declare a variable, JavaScript will default it to a global variable. Whereas in strict mode, undeclared variables will throw an error.
   ```javascript.
   “use strict”;
   x = 3.14; // error: undeclared variable
   ```
2. **Prohibit deletion of variables**: In strict mode, attempting to delete a variable or function will throw an error.
   ```javascript
   “use strict”;
   var x = 3; delete x; // error.
   delete x; // throws an error
   ```
3. **Duplicate parameter names are forbidden**: In strict mode, function parameters cannot have duplicate names.
   ```javascript
   “use strict”; function sum(a, a, c)
   function sum(a, a, c) { 
    // Error: duplicate parameter names.
       return a + a + c;
    } 
   ```

4. **Eliminate binding of `this`**： In strict mode, if a function is called without binding to any object (e.g., as a global function call), `this` will be `undefined` instead of the global object.

   ```javascript
   "use strict";
   function show() {
       console.log(this); // undefined
   }
   show();
   ```

5. **Stricter variable declarations**： Serious mode requires that all variables must be declared using `let`, `const`, or `var`, or an error will be thrown.

How to enable serious mode:
Serious mode is enabled by adding `“use strict”;` statements at the beginning of JavaScript files or inside functions.

```javascript
'use strict'
```

```javascript
function func(){
'use strict'
}
```



 
## Promise
A Promise is a JavaScript object for handling asynchronous operations, allowing us to write asynchronous code in a clearer way. It represents the result of an operation that may complete (or fail) at some point in the future.
Key features:
1. **State**: Promise has three states:
   - **Pending**: the initial state, neither success nor failure.
   - **Fulfilled**: the operation is successfully completed.
   - **Rejected**: the operation failed.


 
2. **Chaining Calls**: Promise allows us to chain calls using the `.then()` and `.catch()` methods to handle success or failure results.
   ```javascript
   const myPromise = new Promise((resolve, reject) => {
       // Asynchronous operation
       const success = true; // Assume the operation was successful
       if (success) {
           resolve(“Succeeded!”) // Enter the fulfilled state.
       } else {
           reject(“Failed!”) // Enter the rejected state.
       }
   }); myPromise
   
   myPromise
       .then(result => {
           console.log(result); // process successful result
       })
       .catch(error => {
           console.error(error); // Handle failure results
       });
   ```
3. **Combining Multiple Promises**: The Promise.all and Promise.race methods allow us to handle combinations of multiple Promises.
   ```javascript
   const promise1 = Promise.resolve(3);
   const promise2 = 42;
   const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 100, “foo”));
   
   Promise.all([promise1, promise2, promise3])
       .then(values => {
           console.log(values); // [3, 42, “foo”]); Promise.all([promise1, promise2, promise3]) .then(console.log(values))
       });
   ```
4. **Avoiding callback hell**: Promise makes code more concise by chaining calls, avoiding the nesting of traditional callback functions and improving readability.





**code example：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=
    , initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <div>
        <button id="btn">Click to Draw</button>
    </div>

    <script>
        function rand(m, n) {
            return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
        }

        const btn = document.querySelector('#btn');

        btn.addEventListener('click', function () {

            const p = new Promise((resolve, reject) => {
                setTimeout(() => {
                    let n = rand(1, 100);

                    if (n <= 30) {
                        resolve(n); // success
                    } else {
                        reject(n); // fail 
                    }
                }, 1000);
            })

            p.then((value) => {
                alert('win a prize ' + value);
            }, (e) => {
                alert('unremitting efforts ' + e)
            })

        })
    </script>

</body>
</html>
```



## Read file contents

```javascript
const fs = require('fs');

fs.readFile('./resource/content.txt', (err, data) => {
    if (err) throw err;

    console.log(data.toString());
})
```



## Read file contents Promise

```javascript
const fs = require('fs');

const p = new Promise((resolve, reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        if (err) reject(err);

        resolve(data);
    })
})

p.then((value) => {
    console.log(value.toString());
}, e => {
    console.log(e)
})
```



## Method Promise

```javascript
function mineReadFile(path){
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, (err, data) => {
            if(err) reject(err);
          
            resolve(data);
        })
    })
}

mineReadFile('./resource/content.txt').then( value => {
    console.log(value.toString());
}, e => {
    console.log(e);
})
```



















































