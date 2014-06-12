var Class = require('jsclass/src/core').Class;
var p2 = require("p2");

var Body = new Class({
  initialize: function(options) {
    var shape;
    shape = this.newShape(options != null ? options : {
      shape: "rectangle",
      width: 100,
      height: 100
    });
    this.body = new p2.Body({
      mass: options ? options.mass : 1,
      position: options ? options.position : [0, 0]
    });
    this.body.addShape(shape);
  },

  newShape: function(options) {
    if (options == null) {
      options = {};
    }
    switch (options.shape.toLowerCase()) {
      case "circle":
        return this.newCircle(options);
      case "capsule":
        return this.newCapsule(options);
      case "line":
        return this.newLine(options);
      case "particle":
        return this.newParticle(options);
      case "plane":
        return this.newPlane(options);
      case "rectangle":
        return this.newRectangle(options);
      default:
        return null;
    }
  },

  newCircle: function(options) {
    if (options == null) {
      options = {};
    }
    return new p2.Circle(options.radius);
  },

  newCapsule: function(options) {
    if (options == null) {
      options = {};
    }
    return new p2.Capsule(options.length, options.radius);
  },

  newLine: function(options) {
    if (options == null) {
      options = {};
    }
    return new p2.Line(options.length);
  },

  newParticle: function(options) {
    if (options == null) {
      options = {};
    }
    return new p2.Particle();
  },

  newPlane: function(options) {
    if (options == null) {
      options = {};
    }
    return new p2.Plane();
  },

  newRectangle: function(options) {
    if (options == null) {
      options = {};
    }
    return new p2.Rectangle(options.width, options.height);
  }
});

module.exports = Body;
