var _ = require('lodash');
var postal = require('postal');
var Base = require('./base');

var Entity = Base.extend({
  constructor: function() {
    this.components = {};
    this.state = null;
  },

  hasComponent: function(componentName) {
    return this.getComponent(componentName) !== void 0;
  },

  getComponent: function(componentName) {
    return this.components['$' + componentName];
  },

  addComponent: function(component) {
    this.components['$' + component.name] = component;

    postal.publish({
      channel: 'entities',
      topic: 'component.add',
      data: {
        entity: this,
        componentName: component.name
      }
    });
  },

  addComponents: function(components) {
    components.forEach(function(component) {
      this.addComponent(component);
    }, this);
  },

  removeComponent: function(componentName) {
    this.components['$' + componentName] = void 0;

    postal.publish({
      channel: 'entities',
      topic: 'component.remove',
      data: {
        entity: this,
        componentName: componentName
      }
    });
  },

  addedToState: function(state) {
    this.state = state;
    _.forEach(this.components, function(component) {
      component.addedToState(state);
    });
  },

  removedFromState: function(state) {
    this.state = null;
    _.forEach(this.components, function(component) {
      component.removedFromState(state);
    });
  }
});

module.exports = Entity;
