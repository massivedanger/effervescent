Signal = require "./signal"

# An object within the {Game}. Has {Component}s that affect its behavior.
class Entity
  # Create a new Entity
  #
  # options - The options
  #
  # Returns {Entity}
  constructor: (options = {}) ->
    @_components = {}
    @onComponentAdded = new Signal()
    @onComponentRemoved = new Signal()

  # Check if the Entity contains a {Component}
  #
  # componentName - {String} Name of component to check for
  #
  # Returns {Boolean} Whether or not the Entity has the {Component}
  hasComponent: (componentName) ->
    @getComponent(componentName) != undefined

  # Get the {Component} object belonging to the Entity
  #
  # componentName - {String} Name of component to get
  #
  # Returns {Component} The component, if present
  getComponent: (componentName) ->
    @_components["$#{componentName}"]

  # Add a {Component} to an Entity
  #
  # component - {Component} The Component object
  addComponent: (component) ->
    @_components["$#{component.name}"] = component
    @onComponentAdded.emit this, component.name

  # Remove a {Component} from an Entity
  #
  # componentName - {String} Name of component to remove
  removeComponent: (componentName) ->
    @_components["$#{componentName}"] = undefined
    @onComponentRemoved.emit this, componentName

module.exports = Entity
