Signal = require "./signal"

class Entity
  constructor: (options = {}) ->
    @components = {}
    @onComponentAdded = new Signal()
    @onComponentRemoved = new Signal()
    @state = null

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

  addedToState: (state) ->
    @state = state
    for component in @components
      addedToState state

  removedFromState: (state) ->
    @state = null
    for component in @components
      removeFromState state

module.exports = Entity
