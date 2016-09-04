const Promise = require('bluebird')

const _methodKeys = function(target) {
  return Object.getOwnPropertyNames(target)
    .filter( key => {
      var descriptor = Object.getOwnPropertyDescriptor(target, key)
      return !descriptor.get && !descriptor.set
    })
    .filter( key => typeof target[key] === 'function' )
}

var _wrapFunctions = function(target) {
  _methodKeys(target).forEach( key => {
    let constructor = target[key].constructor.name
    if(constructor === 'GeneratorFunction') {
      target[key] = Promise.coroutine(target[key])
    }
  })
}

var asyncClass = function(klass) {
  _wrapFunctions(klass)
  _wrapFunctions(klass.prototype)
  return klass
}

module.exports = asyncClass
