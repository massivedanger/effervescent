describe "Family", ->
  Entity = require "../../src/wintermute/entity"
  Component = require "../../src/wintermute/component"
  Family = require "../../src/wintermute/family"

  entity = null
  component = null
  family = null

  beforeEach ->
    entity = new Entity()
    family = new Family("test")
    component = new Component()
    component.name = "test"
    entity.addComponent component

  it "can add an entity, if it matches", ->
    family.addEntityIfMatches entity
    expect(family.getEntities().length).to.equal(1)

  it "does not add an entity if it is not a match", ->
    entity.removeComponent "test"
    family.addEntityIfMatches entity
    expect(family.getEntities().length).to.equal(0)

  it "can remove an entity", ->
    family.addEntityIfMatches entity
    expect(family.getEntities().length).to.equal(1)

    family.removeEntity entity
    expect(family.getEntities().length).to.equal(0)

  it "adds an entity with a callback", ->
    family.onComponentAdded entity, component.name

    expect(family.getEntities().length).to.equal(1)

  it "does not add an entity with a callback if it is not a match", ->
    newEntity = new Entity()
    family.onComponentAdded newEntity, "not.a.member"

    expect(family.getEntities().length).to.equal(0)

  it "removes an entity with a callback", ->
    family.addEntityIfMatches entity
    expect(family.getEntities().length).to.equal(1)

    family.onComponentRemoved entity, component.name
    expect(family.getEntities().length).to.equal(0)

  it "does not remove an entity with a callback if it is not a match", ->
    family.addEntityIfMatches entity
    expect(family.getEntities().length).to.equal(1)

    family.onComponentRemoved entity, "another.test"

    expect(family.getEntities().length).to.equal(1)
