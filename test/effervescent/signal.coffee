describe "Signal", ->
  Signal = requireFromSrc "effervescent/signal"
  signal = null

  beforeEach ->
    signal = new Signal()

  it "can add a listener", ->
    signal.add (testing) -> true
    expect(signal.hasListeners()).to.be.true

  it "can remove a listener", ->
    listener = (testing) -> true
    signal.add listener

    expect(signal.remove(listener)).to.be.true

  it "can emit", ->
    listener = sinon.spy()
    signal.add listener
    signal.emit "hello"

    expect(listener).to.have.been.calledWith "hello"
