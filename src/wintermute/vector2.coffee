class Vector2
  constructor: (x, y) ->
    @set x, y

  set: (x, y) ->
    @x = x
    @y = y

  clone: ->
    new Vector2(@x, @y)

  equal: (other) ->
    other.x == @x and other.y == @y

  angleTo: (other) ->
    Math.atan2(
      @y - other.y,
      @x - other.x
    )

module.exports = Vector2
