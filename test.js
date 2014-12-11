var test = require('tape')
  , nee = require('./index')
  , ee = nee()

test('nee', function (t) {
  var times = 0
    , handler = function (a) { t.equal(a, 1, 'basic emit ' + ++times); return !0}

  ee.on('foo', handler)
  ee.emit('foo', [1])

  ee.on('foo', function (a, b) { t.equal(b, 2, 'Chain emit')})
    .emit('foo', [1, 2])

  t.equal(ee._events.foo.length, 2, 'Two handlers added.')

  var na = ee.listeners('na')
  t.equal(na.length, 0, 'Listeners returns default array.')
  na.push(function () {})
  t.equal(ee.listeners('na').length, 1, 'Listeners array modified.')

  t.end()
})

test('ee', function (t) {
  var ee = nee()
    , ee1 = ee.create()
    , ee2 = ee1.create()

  ee2.foo = 1

  ee.on('bar', function (a, b) { t.equal(b, 2, 'inherited emit 2')})
  ee1.on('bar', function (a, b) { t.equal(b, 2, 'inherited emit 1')})
  ee2.on('bar', function (a) {
    t.equal(this.foo, 1, 'correct handler this')
    t.equal(a, 1, 'inherited emit 0')
  })
     .on('bar', function (a, b) { t.equal(b, 2, 'second emit')})

     .emit('bar', [1, 2])

  t.end()
})

test('off', function (t) {
  var ee1 = nee()

  testOff(ee1, 'nee')

  t.end()

  function testOff (ee, name) {
    var handler = function (a) {
      if (name === 'node EventEmitter') a = a[0]
      t.equal(a, 1, 'basic emit ' + name)
    }

    ee.on('foo', handler)
    ee.emit('foo', [1])

    ee.off('foo', handler)
    ee.emit('foo', [2])

    ee.on('baz', function () { t.fail('off did not work ' + name) })
    ee.off('baz')
    ee.emit('baz')
  }
})


test('wildcard', function (t) {
  var ee1 = nee()

  testWild(ee1, 'nee')

  function testWild (ee, name) {
    var total = 0
      , expected = 3

    t.test(name, function (t) {

      t.plan(2)

      // glob
      ee.on('*', function (a, b) {
        total += 1
        if (total >= expected) t.equal(total, expected, 'Correct number of "*" calls')
      })

      ee.on('bar', function (a, b) {
        if (name === 'node') a = a[0]
        t.equal(a, 1, "Doesn't mess up normal handler")
      })

      ee.emit('foo', [1])

      ee.emit('foo', [2])
        .emit('bar', [1, 2])
    })
  }

})

