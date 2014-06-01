describe "State", ->
  State = require "../../src/wintermute/state"
  Entity = require "../../src/wintermute/entity"
  Component = require "../../src/wintermute/component"
  System = require "../../src/wintermute/system"

  state = null
  entity = null
  component = null
  system = null

  beforeEach ->
    state = new State()
    entity = new Entity()
    system = new System()

    component = new Component()
    component.name = "test"

  it "can add an entity", ->
    entity.addComponent component
    state.addEntity entity

    expect(state.getEntities(["test"])).to.include(entity)

  it "can remove an entity", ->
    entity.addComponent component

    state.addEntity entity
    expect(state.getEntities(["test"])).to.include(entity)

    state.removeEntity entity
    expect(state.getEntities(["test"])).to.not.include(entity)

  it "can notify families when a component is added", ->
    state.addEntity entity
    expect(state.getEntities(["test"])).to.not.include(entity)
    entity.addComponent component

    expect(state.getEntities(["test"])).to.include(entity)

  it "can notify families when a component is removed", ->
    state.addEntity entity
    entity.addComponent component
    expect(state.getEntities(["test"])).to.include(entity)

    state.removeEntity entity
    expect(state.getEntities(["test"])).to.not.include(entity)

  it "can get entities", ->
    entity.addComponent component
    state.addEntity entity

    expect(state.getEntities(["test"])).to.include(entity)

  it "can add a system", ->
    expect(system.state).to.be.null
    state.addSystem system
    expect(system.state).to.be.equal state
    system.update = sinon.spy()

    state.update 1.0

    expect(system.update).to.have.callCount(1)

  it "can remove a system", ->
    state.addSystem system
    state.removeSystem system
    system.update = sinon.spy()

    state.update 1.0

    expect(system.update).to.have.callCount(0)
    expect(system.state).to.be.equal(null)

  it "can update", ->
    state.addSystem system
    system.update = sinon.spy()
    state.update 1.0

    expect(system.update).to.have.callCount(1)