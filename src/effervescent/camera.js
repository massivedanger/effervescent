var Class = require('jsclass/src/core').Class;
var Vector2 = require('./vector2');
var Rectangle = require('./rectangle');

var Camera = new Class({
  initialize: function(objectContainer, options) {
    if (options == null) {
      options = {};
    }

    this.objectContainer = objectContainer;
    this.bounds = this.objectContainer.getBounds();
    this.view = new Rectangle(options.view);

    this.position = this.view.position;
    this.targetPosition = this.position.clone();

    this.atBounds = { x: false, y: false };
  },

  update: function(delta) {
    if (this.following) {
      this.targetPosition.copyFrom(this.following);
    }

    if (!this.position.equal(this.targetPosition)) {
      this.position.add(
        this.targetPosition.clone().multiply({ x: delta, y: delta })
      );
    }

    this.objectContainer.position.x = -this.view.x;
    this.objectContainer.position.y = -this.view.y;
  },

  setTargetPosition: function(options) {
    this.targetPosition.set(options);
  },

  follow: function(object) {
    this.following = object;
  },

  unfollow: function() {
    this.following = null;
  }
});

module.exports = Camera;
