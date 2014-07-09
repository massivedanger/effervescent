var _ = require('lodash');
var Entity = require('./entity');

var Factory = {
  extend: function(properties) {
    return _.assign(this, properties);
  },

  class: Entity,

  run: function() {
    var object = new this.class();
    this.process(object);

    return object;
  },

  process: function(object) {}
}

module.exports = Factory;
