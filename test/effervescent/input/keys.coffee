describe "Keys", ->
  Keys = requireFromSrc "effervescent/input/keys"
  window = null
  event = null

  beforeEach ->
    window =
      addEventListener: sinon.spy()
      removeEventListener: sinon.spy()

    event =
      keyCode: 13

  it "has a map", ->
    expect(Keys.map).to.be.an 'array'

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

  it "has an onKeyUp handler", ->
    Keys.pressed.push "Enter"
    Keys.onKeyUp event

    expect(Keys.released).to.include "Enter"
    expect(Keys.pressed).to.not.include "Enter"

  it "has an onKeyDown handler", ->
    Keys.onKeyDown event

    expect(Keys.pressed).to.include "Enter"

  it "isPressed returns true if a key pressed", ->
    Keys.onKeyDown event

    expect(Keys.isPressed("Enter")).to.be.true

  it "isPressed returns false if a key is not pressed", ->
    Keys.onKeyDown event

    expect(Keys.isPressed("A")).to.be.false

  it "isReleased returns true if a key was released", ->
    Keys.onKeyUp event

    expect(Keys.isReleased("Enter")).to.be.true

  it "isReleased returns false if a key was not released", ->
    Keys.onKeyUp event

    expect(Keys.isReleased("A")).to.be.false
