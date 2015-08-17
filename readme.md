# nee

A novel event emitter. This event emitter has the minimum feature set
that I can make work as the heart of a complex system. It is fast,
it is compact, and it can run in any JavaScript environment.

`npm install nee`

## API

### nee = require('nee')

nee is a constructor function that optionally takes can take another event
emitter to act as the parent of the new event emitter.

### ee.on(type, handler)

Type is the string event type, handler is the function to call when
that event is emitted

### ee.off(type[, handler])

Off removes the handler from the type, if no handler is provided
off removes all evens from the type

### ee.listeners(type)

Returns the array of handlers for that event type.

### ee.emit(type, args)

Takes a string event type, and an array of arguments to be applied
to each event handler.

### ee.create()

Returns a new event emitter that inherits from ee.

## Special * event

Handlers registered on the * event get called every time any event is
emitted. The get passed the type of the event as the first argument, and
all other arguments following.

##License: ISC

Copyright 2015 Nick Niemeir <nick.niemeir@gmail.com>

