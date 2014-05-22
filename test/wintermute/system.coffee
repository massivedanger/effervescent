describe "System", ->
  System = require "../../src/wintermute/system"

  system = null

  beforeEach ->
    system = new System()

  it "has a blank world by default", ->
    expect(system.world).to.be.equal(null)

  it "throws an error when updating by default", ->
    expect(-> system.update(0.01)).to.throw(Error)
