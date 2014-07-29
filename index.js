var slice = require('lodash._slice')
  , pc = require('photocopy')

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
    return pc(listeners(type), function (handler) {
      return handler.apply(self, args)
    })
  }

  function listeners (type) {
    return slice(events[type])
  }
}

