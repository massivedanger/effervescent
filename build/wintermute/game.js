var Family, Game, _;

Family = require("./family");

_ = require("lodash");

Game = (function() {

  /* Public */
  function Game(options) {
    if (options == null) {
      options = {};
    }
    this.container = options.container;
    this._families = {};
    this._systems = [];
    this._entities = [];
  }

  Game.prototype.addEntity = function(entity) {
    var family, _i, _len, _ref;
    _ref = this._families;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      family = _ref[_i];
      family.addEntityIfMatches(entity);
    }
    entity.onComponentAdded.add((function(_this) {
      return function(entity, component) {
        return _this.onComponentAdded(entity, component);
      };
    })(this));
    entity.onComponentRemoved.add((function(_this) {
      return function(entity, component) {
        return _this.onComponentRemoved(entity, component);
      };
    })(this));
    return this._entities.push(entity);
  };

  Game.prototype.removeEntity = function(entity) {
    var family, id, _ref;
    _ref = this._families;
    for (id in _ref) {
      family = _ref[id];
      family.removeEntity(entity);
    }
    this._entities = _.without(this._entities, entity);
    return this._entities.length;
  };

  Game.prototype.getEntities = function(componentNames) {
    var entity, familyId, _i, _len, _ref;
    familyId = "$" + (componentNames.join(","));
    if (!this._families[familyId]) {
      this._families[familyId] = new Family(componentNames);
      _ref = this._entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        this._families[familyId].addEntityIfMatches(entity);
      }
    }
    return this._families[familyId].getEntities();
  };

  Game.prototype.addSystem = function(system) {
    system.game = this;
    return this._systems.push(system);
  };

  Game.prototype.removeSystem = function(system) {
    system.game = null;
    this._systems = _.without(this._systems, system);
    return this._systems.length;
  };

  Game.prototype.update = function(delta) {
    var system, _i, _len, _ref, _results;
    _ref = this._systems;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      system = _ref[_i];
      _results.push(system.update(delta));
    }
    return _results;
  };


  /* Private */

  Game.prototype.onComponentAdded = function(entity, componentName) {
    var family, id, _ref, _results;
    _ref = this._families;
    _results = [];
    for (id in _ref) {
      family = _ref[id];
      _results.push(family.onComponentAdded(entity, componentName));
    }
    return _results;
  };

  Game.prototype.onComponentRemoved = function(entity, componentName) {
    var family, id, _ref, _results;
    _ref = this._families;
    _results = [];
    for (id in _ref) {
      family = _ref[id];
      _results.push(family.onComponentRemoved(entity, componentName));
    }
    return _results;
  };

  return Game;

})();

module.exports = Game;
