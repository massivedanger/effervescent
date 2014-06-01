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
