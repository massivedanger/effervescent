class Signal
  constructor: ->
    @_listeners = []

  hasListeners: ->
    @_listeners.length > 0

  add: (listener) ->
    @_listeners.push listener

  remove: (listener) ->
    index = @_listeners.indexOf listener
    if index != -1
      @_listeners.splice index, 1
      true
    else
      false

  emit: (messages...) ->
    for listener in @_listeners
      listener.apply null, messages

module.exports = Signal
