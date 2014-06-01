State = require "./state"
_ = require "lodash"

class Game
  constructor: (options = {}) ->
    @container = options.container
    @states = []
    @deltaTime = 0
    @running = true

  run: ->
    while @running
      time = Date.now()
      @deltaTime = time - (@deltaTime || time)

      @update()

  pushState: (state) ->
    @states.push state

  popState: (state) ->
    @states.pop()

  changeState: (state) ->
    @states = [state]

  getCurrentState: ->
    _.last @states

  update: ->
    for state in @states
      state.update @deltaTime

module.exports = Game
