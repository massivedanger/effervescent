var Base = require('../base');
var Vector2 = require('./vector2');

var Rectangle = Base.extend({
  constructor: function(options) {
    if (options == null) {
      options = {};
    }

    var x = options.x || 0,
        y = options.y || 0;

    this.position = new Vector2(x, y);
    this.width = options.width || 1280;
    this.height = options.height || 800;
  },

  within: function(vector) {
    var widthCheck = this.position.x <= vector.x &&
      vector.x <= (this.position.x + this.width);
    var heightCheck = this.position.y <= vector.y &&
      vector.y <= (this.position.y + this.height);

    return widthCheck && heightCheck;
  }
});

module.exports = Rectangle;
