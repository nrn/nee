module.exports = EE

function EE (old) {
  if (!(this instanceof EE)) return new EE(old)
  this.par = {emit: noop}
  if (old) this.par = old
  this._events = {}
}

EE.prototype.on = function (type, handler) {
  this.listeners(type).push(handler)
  return this
}

EE.prototype.listeners = function (type) {
  return this._events[type] || (this._events[type] = [])
}

EE.prototype.emit = function (type, args) {
  var i = 0
    , byType = this.listeners(type)
    , star
    , withType

  for (i = 0; i < byType.length; i++) {
    byType[i].apply(this, args)
  }


  if (type !== '*') {
    star = this.listeners('*')
    withType = [type].concat(args)
    for (i = 0; i < star.length; i++) {
      star[i].apply(this, withType)
    }
  }

  this.par.emit(type, args)

  return this
}

EE.prototype.off = function (type, handler) {
  var handlers = this.listeners(type)
    , idx = handlers.length

  while (idx--) {
    if (handlers[idx] === handler) handlers.splice(idx, 1)
  }

  // remove all if no handler specified
  if (!handler) handlers.splice(0, handlers.length)

  return this
}

EE.prototype.create = function () {
  return new this.constructor(this)
}

function noop () {}

