var Vector2 = require("../vector2");

var Mouse = {
  position: new Vector2(),
  listen: function(win) {
    if (win == null) {
      win = window;
    }
    win.onmousemove = this.onMouseMove;
  },
  onMouseMove: function(event) {
    position.set(event.pageX, event.pageY);
  }
};

module.exports = Mouse;
