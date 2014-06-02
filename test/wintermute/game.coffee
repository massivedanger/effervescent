describe "Game", ->
  Game = require "../../src/wintermute/game"
  State = require "../../src/wintermute/state"

  game = null
  state = null

  beforeEach ->
    game = new Game()
    state = new State()

    game.update = ->
      game.running = false

  it "can push a state on its stack", ->
    game.pushState state
    expect(game.getCurrentState()).to.be.equal state

  it "can pop a state", ->
    game.states = [state]
    game.popState()
    expect(game.states).to.be.empty

  it "can change states entirely", ->
    state2 = new State()
    state3 = new State()

    game.pushState state
    game.pushState state3
    game.changeState state2

    expect(game.getCurrentState()).to.be.equal state2
    expect(game.states.length).to.be.equal 1

  it "can get the current state", ->
    state2 = new State()
    state3 = new State()

    game.pushState state3
    game.pushState state2
    game.pushState state

    expect(game.getCurrentState()).to.be.equal state

  it "can tick", ->
    expect(game.deltaTime).to.be.equal 0

  it "updates all states", ->
    game.pushState state
    state.update = sinon.spy()

    game.update()

    expect(state.update).to.have.been.calledWith game.deltaTime
