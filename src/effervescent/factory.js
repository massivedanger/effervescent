var _ = require('lodash');
var Entity = require('./entity');

var Factory = {
  extend: function(properties) {
    return _.assign(this, properties);
  },

  class: Entity,

  process: function(object) {},
  reset: function(object) {},

  get object () {
    var object = new this.class();
    this.process(object);

    return object;
  }
};

module.exports = Factory;
