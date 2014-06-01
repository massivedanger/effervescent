State = require "./state"

class Game
  constructor: (options = {}) ->
    @container = options.container
    @_states = []

  pushState: (state) ->

  popState: ->

  changeState: ->

  getCurrentState: ->

module.exports = Game
