class Signal
  constructor: ->
    @listeners = []

  hasListeners: ->
    @listeners.length > 0

  add: (listener) ->
    @listeners.push listener

  remove: (listener) ->
    index = @listeners.indexOf listener
    if index != -1
      @listeners.splice index, 1
      true
    else
      false

  emit: (messages...) ->
    for listener in @listeners
      listener.apply null, messages

module.exports = Signal
