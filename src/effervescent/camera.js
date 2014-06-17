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
    this.targetPosition = this.position;
    this.following = null;
  },

  update: function(delta) {
    if (this.following !== null) {
      this.targetPosition = this.following;
    }

    if (!this.position.equal(this.targetPosition) && !tweening) {
      this.position.add(this.targetPosition.multiply(delta));
    }
  },

  follow: function(subject) {
    this.following = subject;
  },

  stopFollowing: function() {
    this.following = null;
  }
});

module.exports = Camera;
