Signal = require "./signal"

class Entity
  constructor: (options = {}) ->
    @components = {}
    @onComponentAdded = new Signal()
    @onComponentRemoved = new Signal()

  hasComponent: (componentName) ->
    @getComponent(componentName) != undefined

  getComponent: (componentName) ->
    @components["$#{componentName}"]

  addComponent: (component) ->
    @components["$#{component.name}"] = component
    @onComponentAdded.emit this, component.name

  removeComponent: (componentName) ->
    @components["$#{componentName}"] = undefined
    @onComponentRemoved.emit this, componentName

module.exports = Entity
