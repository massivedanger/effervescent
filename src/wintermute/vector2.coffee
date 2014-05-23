# Represents a 2D vector. Allows some chained operations.
class Vector2
  # Constant radians to degrees multiplicative factor
  @radiansToDegrees: 57.2957795

  # Create a 2D vector
  #
  # x - {Number} The X coordinate
  # y - {Number} The Y coordinate
  #
  # Returns {Vector2} New vector
  constructor: (x = 0.0, y = 0.0) ->
    @set x, y

  # Set the X and Y coordinates
  #
  # x - {Number} The new X coordinate
  # y - {Number} The new Y coordinate
  #
  # Returns {Vector2} self
  set: (x, y) ->
    @x = x
    @y = y

    this

  # Create a copy of the current vector
  #
  # Returns {Vector2} A copy of the vector
  clone: ->
    new Vector2(@x, @y)

  # Check equality with another Vector2
  #
  # Returns {Boolean} Whether or not the vectors are equal
  equal: (other) ->
    other.x == @x and other.y == @y

  # Copy X and Y coordinates from another object
  #
  # other - {Object} with x and y attributes
  #
  # Returns {Vector2} self with new coordinates
  copyFrom: (other) ->
    @set other.x, other.y

  # Add to the X and Y coordinates
  #
  # x - {Number} Amount to add to the X coordinate
  # y - {Number} Amount to add to the Y coordinate
  #
  # Returns {Vector2} self with new coordinates
  add: (x = 0.0, y = 0.0) ->
    @x += x
    @y += y

    this

  # Subtract from the X and Y coordinates
  #
  # x - {Number} Amount to subtract to the X coordinate
  # y - {Number} Amount to subtract to the Y coordinate
  #
  # Returns {Vector2} self with new coordinates
  subtract: (x = 0.0, y = 0.0) ->
    @x -= x
    @y -= y

    this

  # Multiply the X and Y coordinates
  #
  # x - {Number} Amount to multiply the X coordinate
  # y - {Number} Amount to multiply the Y coordinate
  #
  # Returns {Vector2} self with new coordinates
  multiply: (x = 1, y = 1) ->
    @x *= x
    @y *= y

    this

  # Divide the X and Y coordinates
  #
  # x - {Number} Amount to divide the X coordinate
  # y - {Number} Amount to divide the Y coordinate
  #
  # Returns {Vector2} self with new coordinates
  divide: (x = 1, y = 1) ->
    @x /= x
    @y /= y

    this

  # Get the magnitude/length of the vector
  #
  # Returns {Number} The length of the vector
  magnitude: ->
    hypot @x, @y

  # Get the angle of the vector in radians or degrees
  #
  # options - The options
  #           :degrees - {Boolean} If true, returns degrees instead of radians
  #
  # Returns {Number} The angle in radians (or degrees)
  angle: (options = {}) ->
    angle = Math.atan2(@y, @x)
    if options.degrees
      radiansToDegrees angle
    else
      angle

  # Get the angle to another {Vector2}
  #
  # other - The other {Vector2}
  # options - The options
  #           :degrees - {Boolean} If true, returns degrees instead of radians
  #
  # Returns {Number} The angle in radians (or degrees)
  angleTo: (other, options = {}) ->
    angle = Math.atan2(
      @y - other.y,
      @x - other.x
    )

    if options.degrees
      radiansToDegrees angle
    else
      angle

  # Calculate the cross product with another {Vector2}.
  # Useful for determining placement of vectors.
  #
  # other - {Vector2} Other vector
  #
  # Returns {Number} The cross product
  cross: (other) ->
    (@x * other.y) - (@y * other.x)

  # Calculate the dot product with another {Vector2}.
  # Basically, the cosine of the angle between the two vectors.
  #
  # other - The other {Vector2}
  #
  # Returns {Number} The dot product
  dot: (other) ->
    (@x * other.x) + (@y * other.y)

  # Clamp the values of the vector coordinates within two values
  #
  # options - The options
  #           :x - {Array} of two numbers (mix and max) to constrain X by
  #           :y - {Array} of two numbers (mix and max) to constrain Y by
  #           :all - {Array} of two numbers (min and max) to contrain both
  #                 coordinates by
  clamp: (options = {}) ->
    if options.x
      @x = clampNumber(@x, min: options.x[0], max: options.x[1])
    if options.y
      @y = clampNumber(@y, min: options.y[0], max: options.y[1])
    if options.all
      @x = clampNumber(@x, min: options.all[0], max: options.all[1])
      @y = clampNumber(@y, min: options.all[0], max: options.all[1])

    this

  # Rotate the vector's coordinates
  #
  # rotation - {Number} The amount to rotate by in radians (or degrees)
  # options - The options
  #           :degrees - {Boolean} Whether or not {rotation} is a degree amount
  #
  # Returns {Vector2} self with new coordinates
  rotate: (rotation, options = {}) ->
    if options.degrees
      rotation /= Vector2.radiansToDegrees

    originalMagnitude = @magnitude()

    @x = Math.cos(rotation) * originalMagnitude
    @y = Math.sin(rotation) * originalMagnitude

    this

  ### Private ###

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
