describe "Mouse", ->
  Mouse = require "../../../src/wintermute/input/mouse"
  window = null

  beforeEach ->
    window =
      addEventListener: sinon.spy()
      removeEventListener: sinon.spy()

  it "has a default position", ->
    expect(Mouse.position.x).to.be.equal 0
    expect(Mouse.position.y).to.be.equal 0
