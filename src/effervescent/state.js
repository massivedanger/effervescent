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
    this.running = true;

    this.created();
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
    this.families = {};
  },

  created: function() {},
  entered: function() {},
  exited: function() {},
  paused: function() {},
  resumed: function() {},

  update: function(delta) {
    if (this.running) {
      this.systems.forEach(function(system) {
        system.update(delta);
      });
    }
  },

  pause: function() {
    this.running = false;
    postal.publish({
      channel: 'states',
      topic: 'pause',
      data: {
        state: this
      }
    });

    this.paused();
  },

  resume: function() {
    this.running = true;
    postal.publish({
      channel: 'states',
      topic: 'resume',
      data: {
        state: this
      }
    });

    this.resumed();
  }
});

module.exports = State;
