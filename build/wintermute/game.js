var Family, Game,
  __slice = [].slice;

Family = require("./family");

Game = (function() {
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
    entity.onComponentAdded.add(function(entity, component) {
      return this._onComponentAdded(entity, component);
    });
    entity.onComponentRemoved.add(function(entity, component) {
      return this._onComponentRemoved(entity, component);
    });
    return this._entities.push(entity);
  };

  Game.prototype.remoteEntity = function(entity) {
    var family, id, index, _i, _len, _ref;
    _ref = this._families;
    for (family = _i = 0, _len = _ref.length; _i < _len; family = ++_i) {
      id = _ref[family];
      family.removeEntity(entity);
    }
    index = this._entities.indexOf(entity);
    if (index >= 0) {
      return this._entities.splice(index, 1);
    }
  };

  Game.prototype.getEntities = function() {
    var componentNames, entity, familyId, _i, _len, _ref;
    componentNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    familyId = "$" + (componentNames.join(","));
    if (!this._families[familyId]) {
      this._families[familyId] = new Family(componentNames);
    }
    _ref = this._entities;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      entity = _ref[_i];
      this._families[familyId].addEntityIfMatches(entity);
    }
    return this._families[familyId].getEntities();
  };

  Game.prototype.addSystem = function(system) {
    system.game = this;
    return this._systems.push(system);
  };

  Game.prototype.removeSystem = function(system) {
    var index;
    index = this._systems.indexOf(system);
    if (index >= 0) {
      return this._systems.splice(index, 1);
    }
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

  Game.prototype._onComponentAdded = function(entity, componentName) {
    var family, id, _i, _len, _results;
    _results = [];
    for (family = _i = 0, _len = families.length; _i < _len; family = ++_i) {
      id = families[family];
      _results.push(family.onComponentAdded(entity, componentName));
    }
    return _results;
  };

  Game.prototype._onComponentRemoved = function(entity, componentName) {
    var family, id, _i, _len, _results;
    _results = [];
    for (family = _i = 0, _len = families.length; _i < _len; family = ++_i) {
      id = families[family];
      _results.push(family.onComponentRemoved(entity, componentName));
    }
    return _results;
  };

  return Game;

})();

module.exports = Game;
