p2 = require "p2"

class World
  constructor: (options = {}) ->
    @_world = @newWorld options

  update: (delta) ->
    @_world.step delta

  newWorld: (options = {}) ->
    new p2.World(gravity: options.gravity ? [0, 0])

module.exports = World
