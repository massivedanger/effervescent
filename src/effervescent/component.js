var Base = require('./base');

var Component = Base.extend({
  name: '',
  addedToState: function(state) {},
  removedFromState: function(state) {}
});

module.exports = Component;
