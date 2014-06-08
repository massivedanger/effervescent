Signal = require "./signal"

class Entity
  constructor: ->
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

    this

  addComponents: (components = []) ->
    for component in components
      @addComponent component

    this

  removeComponent: (componentName) ->
    @components["$#{componentName}"] = undefined
    @onComponentRemoved.emit this, componentName

    this

  addedToState: (state) ->
    @state = state
    for component in @components
      addedToState state

  removedFromState: (state) ->
    @state = null
    for component in @components
      removeFromState state

module.exports = Entity
