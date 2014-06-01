describe "Game", ->
  Game = require "../../src/wintermute/game"
  State = require "../../src/wintermute/state"

  game = null
  state = null

  beforeEach ->
    game = new Game()
    state = new State()

  it "can take a container", ->
    game = new Game(container: "#game")
    expect(game.container).to.be.equal("#game")

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

  it "can run", ->
    game.update = ->
      game.running = false

    game.run()

    expect(game.deltaTime).to.be.equal 0
    expect(game.running).to.be.false

  it "updates all states", ->
    state.update = sinon.spy()
    game.pushState state

    game.update()

    expect(state.update).to.have.been.calledWith 0
