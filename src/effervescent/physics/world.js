var p2 = require('p2');
var Base = require('../base');

var World = Base.extend({
  constructor: function(options) {
    if (options == null) {
      options = {};
    }
    this.world = this.newWorld(options);
  },

  update: function(delta) {
    this.world.step(delta);
  },

  newWorld: function(options) {
    var _ref;
    if (options == null) {
      options = {};
    }
    return new p2.World({
      gravity: (_ref = options.gravity) != null ? _ref : [0, 0]
    });
  }
});

module.exports = World;
