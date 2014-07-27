var test = require('tape')
  , nee = require('./index')

test('nee', function (t) {
  var times = 0
    , handler = function (a) { t.equal(a, 1, 'basic emit ' + ++times)}
    , ee = nee()

  ee.on('foo', handler)
  ee.emit('foo', [1])

  ee.on('foo', function (a, b) { t.equal(b, 2, 'Chain emit')})
    .emit('foo', [1, 2])

  t.equal(ee._events.foo.length, 2, 'Two handlers added.')

  var na = ee.listeners('na')
  t.equal(na.length, 0, 'Listeners returns default array.')
  na.push(function () {})
  t.equal(ee.listeners('na').length, 0, 'Listeners array not modified.')

  t.end()
})
