State = require "./state"
_ = require "lodash"
p2 = require "p2"

unless (server = typeof window is "undefined")
  PIXI = require "pixi.js"
  jQuery = require "jquery"

class Game
  constructor: (options = {}) ->
    @states = []
    @deltaTime = 0
    @running = true

    @setupGraphics unless server
    @setupPhysics(options.physics) if options.physics

    @scheduleNext @tick.bind(this)

  tick: (time) ->
    if @running
      @deltaTime = time - (@lastUpdateTime || time)
      @lastUpdateTime = time

      @update()
      @render() unless server

      @scheduleNext @tick.bind(this)

  update: ->
    if @physics and @physics.enabled
      @physics.world.update @deltaTime

    for state in @states
      state.update @deltaTime

  render: ->
    @renderer.render @stage

  addChildToStage: (child) ->
    @stage.addChild child

  removeChildFromStage: (child) ->
    @stage.removeChild child

  pushState: (state) ->
    state.game = this
    @states.push state

  popState: ->
    state = @states.pop()
    state.game = null
    state

  changeState: (state) ->
    state.game = this
    @states = [state]

  getCurrentState: ->
    _.last @states

  setupGraphics: ->
    @container = jQuery(options.container ? "body")
    @stage = @createStage()
    @renderer = @createRenderer()

    @container.append @renderer.view

  createStage: ->
    new PIXI.Stage(0x000000)

  createRenderer: ->
    PIXI.autoDetectRenderer(@container.width(), @container.height())

  setupPhysics: (options = {})->
    @physics =
      world: new Physics.World(gravity: options.gravity ? [0, 0]),
      enabled: options.enabled ? true

  scheduleNext: (callback) ->
    if server
      process.nextTick callback
    else
      requestAnimationFrame callback

module.exports = Game
