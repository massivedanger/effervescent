var _ = require('lodash');
var postal = require('postal');
var Family = require('./family');
var Base = require('./base');

var State = Base.extend({
  constructor: function() {
    this.game = null;
    this.families = {};
    this.systems = [];
    this.entities = [];
  },

  addEntity: function(entity) {
    postal.publish({
      channel: 'entities',
      topic: 'add',
      data: {
        entity: entity
      }
    });

    this.entities.push(entity);
    entity.addedToState(this);

    return entity;
  },

  removeEntity: function(entity) {
    if (entity.state === this) {
      postal.publish({
        channel: 'entities',
        topic: 'remove',
        data: {
          entity: entity
        }
      });

      this.entities = _.without(this.entities, entity);
      entity.removedFromState(this);
      return this.entities.length;
    }
  },

  getEntities: function(componentNames) {
    var familyId = '$' + (componentNames.join(','));
    if (!this.families[familyId]) {
      var family = this.families[familyId] = new Family(componentNames);
      this.entities.forEach(function(entity) {
        family.addEntityIfMatches(entity);
      }, this);
    }
    return this.families[familyId].entities;
  },

  addSystem: function(system) {
    system.state = this;
    return this.systems.push(system);
  },

  removeSystem: function(system) {
    system.state = null;
    this.systems = _.without(this.systems, system);
    return this.systems.length;
  },

  reset: function() {
    this.entities = [];
    this.systems = [];
    return this.families = {};
  },

  enter: function() {},
  exit: function() {},
  pause: function() {},
  resume: function() {},

  update: function(delta) {
    var system, _i, _len, _ref, _results;
    _ref = this.systems;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      system = _ref[_i];
      _results.push(system.update(delta));
    }
    return _results;
  }
});

module.exports = State;
