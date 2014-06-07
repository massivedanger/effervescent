Family = require "./family"
_ = require "lodash"

class State
  constructor: ->
    @game = null

    @families = {}
    @systems = []
    @entities = []

  addEntity: (entity) ->
    for family in @families
      family.addEntityIfMatches entity

    entity.onComponentAdded.add (entity, component) =>
      @onComponentAdded entity, component

    entity.onComponentRemoved.add (entity, component) =>
      @onComponentRemoved entity, component

    @entities.push entity
    entity.addedToState this

  removeEntity: (entity) ->
    for id, family of @families
      family.removeEntity entity

    if entity.state is this
      @entities = _.without @entities, entity
      entity.removedFromState this

      @entities.length

  getEntities: (componentNames) ->
    familyId = "$#{componentNames.join(",")}"
    unless @families[familyId]
      @families[familyId] = new Family componentNames

      for entity in @entities
        @families[familyId].addEntityIfMatches entity

    @families[familyId].entities

  addSystem: (system) ->
    system.state = this
    @systems.push system

  removeSystem: (system) ->
    system.state = null
    @systems = _.without @systems, system
    @systems.length

  reset: ->
    @entities = []
    @systems = []
    @families = {}

  onComponentAdded: (entity, componentName) ->
    for id, family of @families
      family.onComponentAdded entity, componentName

  onComponentRemoved: (entity, componentName) ->
    for id, family of @families
      family.onComponentRemoved entity, componentName

  enter: ->

  exit: ->

  pause: ->

  resume: ->

  update: (delta) ->
    for system in @systems
      system.update delta

module.exports = State
