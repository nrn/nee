var nee = require('./index')

var foo = nee()

foo.on('*', console.log)
foo.emit('a', ['A thing happened!'])
foo.bar = foo.create()
foo.bar.baz = foo.bar.create()
foo.bar.message = 'omgzor'

foo.bar.on('a', function () { console.log(this.message) })
foo.bar.off('a')

foo.bar.baz.emit('a', [1, 2, 3])

var f = foo.create()

f.on('foo', function () { console.log('f')})
  .on('*', function (a, b) { console.log(a, b,'f*')})
var a = function () { console.log('e*')}
foo.on('*', a)
  .off('*')

foo.on('foo', function (bar) {
  console.log(bar)
})

f.emit('foo', ['bar'])

