var Class = require('jsclass/src/core').Class;
var Vector2 = require('./vector2');

var Camera = new Class({
  initialize: function(objectContainer, options) {
    if (options == null) {
      options = {};
    }

    this.objectContainer = objectContainer;
    this.bounds = this.objectContainer.getBounds();

    this.position = new Vector2(options.x || 0, options.y || 0);
    this.targetPosition = this.position.clone();
  },

  update: function(delta) {
    if (!this.position.equal(this.targetPosition)) {
      this.position.add(
        this.targetPosition.clone().multiply({ x: delta, y: delta })
      );
    }
  }
});

module.exports = Camera;
