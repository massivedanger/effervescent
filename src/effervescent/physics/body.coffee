p2 = require "p2"

class Body
  constructor: (options) ->
    shape = @newShape(options ? {
      shape: "rectangle"
      width: 100
      height: 100
    })

    @body = new p2.Body
      mass: if options then options.mass else 1
      position: if options then options.position else [0, 0]

    @body.addShape shape

  newShape: (options = {}) ->
    switch options.shape.toLowerCase()
      when "circle" then @newCircle options
      when "capsule" then @newCapsule options
      when "line" then @newLine options
      when "particle" then @newParticle options
      when "plane" then @newPlane options
      when "rectangle" then @newRectangle options
      else null

  newCircle: (options = {}) ->
    new p2.Circle options.radius

  newCapsule: (options = {}) ->
    new p2.Capsule options.length, options.radius

  newLine: (options = {}) ->
    new p2.Line options.length

  newParticle: (options = {}) ->
    new p2.Particle()

  newPlane: (options = {}) ->
    new p2.Plane()

  newRectangle: (options = {}) ->
    new p2.Rectangle options.width, options.height

module.exports = Body
