const Promise = require('bluebird')
const asyncClass = require('../index')

const returnAsync = (x) => Promise.resolve(x)

class Adder {

  * asyncAdd(a, b) {
    const resultA = yield returnAsync(a)
    const resultB = yield returnAsync(b)
    return resultA +resultB
  }

  syncAdd(a, b) {
    return a + b
  }
}


describe('asyncClass', function () {
  Adder = asyncClass(Adder)
  const adder = new Adder()

  it('makes generator function return promise', function* () {
    const resultP = adder.asyncAdd(1, 2)
    assert.instanceOf(resultP, Promise)
    const result = yield resultP
    assert.equal(result, 3)
  })

  it('does not touch non generator function', function* () {
    const result = adder.syncAdd(1, 2)
    assert.equal(result, 3)
  })
})
