describe "Keys", ->
  Keys = require "../../../src/wintermute/input/keys"
  window = null

  beforeEach ->
    window =
      addEventListener: sinon.spy()
      removeEventListener: sinon.spy()

  it "has codes", ->
    expect(Keys.codes).to.be.an 'object'

  it "has names", ->
    expect(Keys.names).to.be.an 'object'

  it "can listen for key events", ->
    Keys.listen window

    expect(window.addEventListener).to.have.been.calledWith "keydown",
      Keys.onKeyDown

    expect(window.addEventListener).to.have.been.calledWith "keyup",
      Keys.onKeyUp

  it "can stop listening for key events", ->
    Keys.listen window
    Keys.stopListening window

    expect(window.removeEventListener).to.have.been.calledWith "keydown",
      Keys.onKeyDown

    expect(window.removeEventListener).to.have.been.calledWith "keyup",
      Keys.onKeyUp
