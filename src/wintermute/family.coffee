_ = require "lodash"

class Family
  constructor: (componentNames) ->
    @_componentNames = componentNames
    @_entities = []

  getEntities: ->
    @_entities

  addEntityIfMatches: (entity) ->
    if not (entity in @_entities) and @_entityMatches entity
      @_entities.push entity

  removeEntity: (entity) ->
    @_entities = _.without @_entities, entity
    @_entities.length

  onComponentAdded: (entity, componentName) =>
    if componentName in @_componentNames
      @addEntityIfMatches entity

  onComponentRemoved: (entity, componentName) =>
    if entity in @_entities
      if componentName in @_componentNames
        @_entities = _.without @_entities, entity

  _entityMatches: (entity) ->
    for name in @_componentNames
      unless entity.hasComponent name
        return false

    true

module.exports = Family
