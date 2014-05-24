var Family, _,
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require("lodash");

Family = (function() {

  /* Public */
  function Family() {
    var componentNames;
    componentNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this._componentNames = componentNames;
    this._entities = [];
  }

  Family.prototype.getEntities = function() {
    return this._entities;
  };

  Family.prototype.addEntityIfMatches = function(entity) {
    if (!(__indexOf.call(this._entities, entity) >= 0) && this._entityMatches(entity)) {
      return this._entities.push(entity);
    }
  };

  Family.prototype.removeEntity = function(entity) {
    this._entities = _.without(this._entities, entity);
    return this._entities.length;
  };

  Family.prototype.onComponentAdded = function(entity, componentName) {
    return this.addEntityIfMatches(entity);
  };

  Family.prototype.onComponentRemoved = function(entity, componentName) {
    if (__indexOf.call(this._entities, entity) >= 0) {
      if (__indexOf.call(this._componentNames, componentName) >= 0) {
        return this._entities = _.without(this._entities, entity);
      }
    }
  };


  /* Private */

  Family.prototype._entityMatches = function(entity) {
    var name, _i, _len, _ref;
    _ref = this._componentNames;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      if (!entity.hasComponent(name)) {
        return false;
      }
    }
    return true;
  };

  return Family;

})();

module.exports = Family;
