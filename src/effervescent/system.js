var Base = require('./base');

var System = Base.extend({
  constructor: function() {
    this.state = null;
  },

  update: function(delta) {
    throw new Error('Override #update');
  }
});

module.exports = System;
