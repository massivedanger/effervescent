_ = require "lodash"

# Groups a {Game}'s {Entity} list into a set matching a list of {Component}s
class Family
  ### Public ###

  # Create a Family
  #
  # componentNames - {Array} Component names
  #
  # Returns {Family} the new Family
  constructor: (componentNames) ->
    @_componentNames = componentNames
    @_entities = []

  # Get all entities belonging to this Family
  #
  # Returns {Array} All the entities belong to this Family
  getEntities: ->
    @_entities

  # Add an {Entity} to this Family if it matches the required Components
  #
  # entity - {Entity} The entity to attempt to add
  #
  # Returns {Number} if successful, the number of entities belonging to the Family
  addEntityIfMatches: (entity) ->
    if not (entity in @_entities) and @_entityMatches entity
      @_entities.push entity

  # Remove an {Entity} from this Family
  #
  # entity - {Entity} The entity to attempt to remove
  #
  # Returns {Number} The number of entities belonging to this Family
  removeEntity: (entity) ->
    @_entities = _.without @_entities, entity
    @_entities.length

  # Callback used to add an {Entity} to this Family
  #
  # entity - {Entity} The entity
  # componentName - The name of the {Component}
  onComponentAdded: (entity, componentName) =>
    if componentName in @_componentNames
      @addEntityIfMatches entity

  # Callback used to remove an {Entity} from this Family
  #
  # entity - {Entity} The entity
  # componentName - The name of the {Component}
  onComponentRemoved: (entity, componentName) =>
    if entity in @_entities
      if componentName in @_componentNames
        @_entities = _.without @_entities, entity


  ### Private ###

  _entityMatches: (entity) ->
    for name in @_componentNames
      unless entity.hasComponent name
        return false

    true

module.exports = Family
