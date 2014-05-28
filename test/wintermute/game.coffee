describe "Game", ->
  Game = require "../../src/wintermute/game"
  Entity = require "../../src/wintermute/entity"
  Component = require "../../src/wintermute/component"
  System = require "../../src/wintermute/system"

  game = null
  entity = null
  component = null
  system = null

  beforeEach ->
    game = new Game()
    entity = new Entity()
    system = new System()

    component = new Component()
    component.name = "test"

  it "can take a container", ->
    game = new Game(container: "#game")
    expect(game.container).to.be.equal("#game")

  it "can add an entity", ->
    entity.addComponent component
    game.addEntity entity

    expect(game.getEntities(["test"])).to.include(entity)

  it "can remove an entity", ->
    entity.addComponent component

    game.addEntity entity
    expect(game.getEntities(["test"])).to.include(entity)

    game.removeEntity entity
    expect(game.getEntities(["test"])).to.not.include(entity)

  it "can notify families when a component is added", ->
    game.addEntity entity
    expect(game.getEntities(["test"])).to.not.include(entity)
    entity.addComponent component

    expect(game.getEntities(["test"])).to.include(entity)

  it "can notify families when a component is removed", ->
    game.addEntity entity
    entity.addComponent component
    expect(game.getEntities(["test"])).to.include(entity)

    game.removeEntity entity
    expect(game.getEntities(["test"])).to.not.include(entity)

  it "can get entities", ->
    entity.addComponent component
    game.addEntity entity

    expect(game.getEntities(["test"])).to.include(entity)

  it "can add a system", ->
    expect(system.game).to.be.undefined
    game.addSystem system
    expect(system.game).to.be.equal(game)
    system.update = sinon.spy()

    game.update 1.0

    expect(system.update).to.have.callCount(1)

  it "can remove a system", ->
    game.addSystem system
    game.removeSystem system
    system.update = sinon.spy()

    game.update 1.0

    expect(system.update).to.have.callCount(0)
    expect(system.game).to.be.equal(null)

  it "can update", ->
    game.addSystem system
    system.update = sinon.spy()
    game.update 1.0

    expect(system.update).to.have.callCount(1)
