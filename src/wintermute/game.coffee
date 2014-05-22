Family = require "./family"

class Game
  constructor: (options = {}) ->
    @container = options.container
    @_families = {}
    @_systems = []
    @_entities = []

  addEntity: (entity) ->
    for family in @_families
      family.addEntityIfMatches entity

    entity.onComponentAdded.add (entity, component) ->
      @_onComponentAdded entity, component

    entity.onComponentRemoved.add (entity, component) ->
      @_onComponentRemoved entity, component

    @_entities.push entity

  remoteEntity: (entity) ->
    for id, family in @_families
      family.removeEntity entity

    index = @_entities.indexOf(entity)
    if index >= 0
      @_entities.splice index, 1

  getEntities: (componentNames...) ->
    familyId = "$#{componentNames.join(",")}"
    unless @_families[familyId]
      @_families[familyId] = new Family componentNames

    for entity in @_entities
      @_families[familyId].addEntityIfMatches entity

    @_families[familyId].getEntities()

  addSystem: (system) ->
    system.game = this
    @_systems.push system

  removeSystem: (system) ->
    index = @_systems.indexOf system
    if index >= 0
      @_systems.splice index, 1

  update: (delta) ->
    for system in @_systems
      system.update delta

  _onComponentAdded: (entity, componentName) ->
    for id, family in families
      family.onComponentAdded entity, componentName

  _onComponentRemoved: (entity, componentName) ->
    for id, family in families
      family.onComponentRemoved entity, componentName

module.exports = Game
