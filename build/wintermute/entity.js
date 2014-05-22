var Entity, Signal;

Signal = require("./signal");

Entity = (function() {
  function Entity(options) {
    if (options == null) {
      options = {};
    }
    this._components = {};
    this.onComponentAdded = new Signal();
    this.onComponentRemoved = new Signal();
  }

  Entity.prototype.hasComponent = function(componentName) {
    return this.getComponent(componentName) !== void 0;
  };

  Entity.prototype.getComponent = function(componentName) {
    return this._components["$" + componentName];
  };

  Entity.prototype.addComponent = function(component) {
    this._components["$" + component.name] = component;
    return this.onComponentAdded.emit(component.name);
  };

  Entity.prototype.removeComponent = function(componentName) {
    this._components["$" + componentName] = void 0;
    return this.onComponentRemoved.emit(componentName);
  };

  return Entity;

})();

module.exports = Entity;
