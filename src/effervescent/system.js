var Class = require('jsclass/src/core').Class;

var System = new Class({
  initialize: function() {
    this.state = null;
  },

  update: function(delta) {
    throw new Error('Override #update');
  }
});

module.exports = System;
