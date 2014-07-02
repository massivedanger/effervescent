var _ = require('lodash');
var Base = require('./base');
var postal = require('postal');

var Family = Base.extend({
  constructor: function(componentNames) {
    this.componentNames = componentNames;
    this.entities = [];

    var channel = postal.channel('entities');
    channel.subscribe('component.add', this.entityComponentAdded.bind(this));
    channel.subscribe('component.remove', this.entityComponentRemoved.bind(this));
    channel.subscribe('add', this.entityAdded.bind(this));
    channel.subscribe('remove', this.entityRemoved.bind(this));
  },

  addEntityIfMatches: function(entity) {
    if (!_.contains(this.entities, entity) && this.entityMatches(entity)) {
      this.entities.push(entity);
    }
  },

  removeEntity: function(entity) {
    this.entities = _.without(this.entities, entity);
  },

  entityAdded: function(data, envelope) {
    this.addEntityIfMatches(data.entity);
  },

  entityRemoved: function(data, envelope) {
    this.removeEntity(data.entity);
  },

  entityComponentAdded: function(data, envelope) {
    if (_.contains(this.componentNames, data.componentName)) {
      this.addEntityIfMatches(data.entity);
    }
  },

  entityComponentRemoved: function(data, envelope) {
    if (_.contains(this.entities, data.entity) &&
        _.contains(this.componentNames, data.componentName)) {
      this.entities = _.without(this.entities, data.entity);
    }
  },

  entityMatches: function(entity) {
    var match = true;
    this.componentNames.forEach(function(name) {
      if (!entity.hasComponent(name)) {
        match = false;
      }
    });

    return match;
  }
});

module.exports = Family;
