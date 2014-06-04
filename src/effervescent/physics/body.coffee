p2 = require "p2"

class Body
  constructor: (options = {}) ->
    shape = @newShape(options.shape ? {
      shape: "rectangle"
      width: 100
      height: 100
    })

    @_body = new p2.Body
      mass: options.mass ? 1
      position: options.position ? [0, 0]

    @_body.addShape shape

  newShape: (options = {}) ->
    switch options.shape.toLowerCase()
      when "rectangle" then @newRectangle options
      when "circle" then @newCircle options
      else null

module.exports = Body
