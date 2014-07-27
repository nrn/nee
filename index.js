module.exports = makeEE

function makeEE () {
  var events = {}

  return { on: on
         , emit: emit
         , listeners: listeners
         , _events: events
         }

  function on (type, handler) {
    events[type] = listeners(type).concat(handler)
    return this
  }

  function emit (type, args) {
    var self = this
    listeners(type).forEach(function (handler) {
      handler.apply(self, args)
    })
    return self
  }

  function listeners (type) {
    var listenersArr = events[type]
    if (listenersArr && Array.isArray(listenersArr)) {
      return listenersArr.slice(0)
    } else {
      return []
    }
  }
}

