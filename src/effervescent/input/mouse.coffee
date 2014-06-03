Vector2 = require "../vector2"

Mouse =
  position: new Vector2()

  listen: (win = window) ->
    win.onmousemove = @onMouseMove

  onMouseMove: (event) ->
    position.set event.pageX, event.pageY

module.exports = Mouse
