_ = require "lodash"

class Family
  constructor: (componentNames) ->
    @componentNames = componentNames
    @entities = []

  addEntityIfMatches: (entity) ->
    if not (entity in @entities) and @entityMatches entity
      @entities.push entity

  removeEntity: (entity) ->
    @entities = _.without @entities, entity
    @entities.length

  onComponentAdded: (entity, componentName) =>
    if componentName in @componentNames
      @addEntityIfMatches entity

  onComponentRemoved: (entity, componentName) =>
    if entity in @entities
      if componentName in @componentNames
        @entities = _.without @entities, entity

  entityMatches: (entity) ->
    for name in @componentNames
      unless entity.hasComponent name
        return false

    true

module.exports = Family
