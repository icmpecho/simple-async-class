# simple async class

A simple utility module to convert every generator function in a Class into a function that returns promise

Install with:
```sh
npm install simple-async-class
```

## Usage Example

```js
const asyncClass = require('simple-async-class')

class MyClass {
  * doSomething() {
    // yield ...
  }
}

module.exports = asyncClass(MyClass)
```
