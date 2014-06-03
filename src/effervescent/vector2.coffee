class Vector2
  @radiansToDegrees: 57.2957795

  constructor: (x = 0.0, y = 0.0) ->
    @set x, y

  set: (x, y) ->
    @x = x
    @y = y

    this

  clone: ->
    new Vector2(@x, @y)

  equal: (other) ->
    other.x == @x and other.y == @y

  copyFrom: (other) ->
    @set other.x, other.y

  add: (x = 0.0, y = 0.0) ->
    @x += x
    @y += y

    this

  subtract: (x = 0.0, y = 0.0) ->
    @x -= x
    @y -= y

    this

  multiply: (x = 1, y = 1) ->
    @x *= x
    @y *= y

    this

  divide: (x = 1, y = 1) ->
    @x /= x
    @y /= y

    this

  magnitude: ->
    hypot @x, @y

  angle: (options = {}) ->
    angle = Math.atan2(@y, @x)
    if options.degrees
      radiansToDegrees angle
    else
      angle

  angleTo: (other, options = {}) ->
    angle = Math.atan2(
      @y - other.y,
      @x - other.x
    )

    if options.degrees
      radiansToDegrees angle
    else
      angle

  cross: (other) ->
    (@x * other.y) - (@y * other.x)

  dot: (other) ->
    (@x * other.x) + (@y * other.y)

  clamp: (options = {}) ->
    if options.x
      @x = clampNumber(@x, min: options.x[0], max: options.x[1])
    if options.y
      @y = clampNumber(@y, min: options.y[0], max: options.y[1])
    if options.all
      @x = clampNumber(@x, min: options.all[0], max: options.all[1])
      @y = clampNumber(@y, min: options.all[0], max: options.all[1])

    this

  rotate: (rotation, options = {}) ->
    if options.degrees
      rotation /= Vector2.radiansToDegrees

    originalMagnitude = @magnitude()

    @x = Math.cos(rotation) * originalMagnitude
    @y = Math.sin(rotation) * originalMagnitude

    this

  hypot = (a, b) ->
    if a is 0
      Math.abs b
    else
      Math.abs(a) * Math.sqrt 1 + Math.pow b/a, 2

  radiansToDegrees = (radians) ->
    radians * Vector2.radiansToDegrees

  clampNumber = (number, options = {}) ->
    min = options.min ? 0
    max = options.max ? 1

    if number < min
      min
    else if number > max
      max
    else
      number

module.exports = Vector2
