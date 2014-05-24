Family = require "./family"
_ = require "lodash"

# The base class for the game, of course. Generally, you'll only need one.
class Game

  ### Public ###

  # Create a new Game
  #
  # options - The options
  #           :container - {String} HTML selector for the game's container element
  constructor: (options = {}) ->
    @container = options.container
    @_families = {}
    @_systems = []
    @_entities = []

  # Add an entity to the game for manipulation
  #
  # entity - {Entity} Entity to add
  #
  # Returns {Number} Total entities in the game
  addEntity: (entity) ->
    for family in @_families
      family.addEntityIfMatches entity

    entity.onComponentAdded.add (entity, component) ->
      @_onComponentAdded entity, component

    entity.onComponentRemoved.add (entity, component) ->
      @_onComponentRemoved entity, component

    @_entities.push entity

  # Remove an entity from the game
  #
  # entity - {Entity} Entity to remove
  #
  # Returns {Number} Total entities in the game
  removeEntity: (entity) ->
    for id, family of @_families
      family.removeEntity entity

    @_entities = _.without @_entities, entity
    @_entities.length

  # Get all entities matching a list of component names
  #
  # componentNames - {Array} List of component names to query by
  #
  # Returns {Array} List of entities matching all those component names
  getEntities: (componentNames...) ->
    familyId = "$#{componentNames.join(",")}"
    unless @_families[familyId]
      @_families[familyId] = new Family componentNames

      for entity in @_entities
        @_families[familyId].addEntityIfMatches entity

    @_families[familyId].getEntities()

  # Add a system that'll be updated each timestep
  #
  # system - {System} The system to add
  #
  # Returns {Number} Total systems in the game
  addSystem: (system) ->
    system.game = this
    @_systems.push system

  # Remove a system that'll be updated each timestep
  #
  # system - {System} The system to remove
  #
  # Returns {Number} Total systems in the game
  removeSystem: (system) ->
    system.game = null
    @_systems = _.without @_systems, system
    @_systems.length

  # Update all the systems added to the game
  #
  # delta - {Number} Amount of time that has passed between frames
  update: (delta) ->
    for system in @_systems
      system.update delta

  ### Private ###

  _onComponentAdded: (entity, componentName) ->
    for id, family in families
      family.onComponentAdded entity, componentName

  _onComponentRemoved: (entity, componentName) ->
    for id, family in families
      family.onComponentRemoved entity, componentName

module.exports = Game
