describe "World", ->
  p2 = require "p2"
  World = requireFromSrc "effervescent/physics/world"
  world = null

  beforeEach ->
    world = new World()

  it "has a P2 world by default", ->
    expect(world.world).to.be.an.instanceOf p2.World

