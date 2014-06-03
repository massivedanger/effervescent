State = require "./state"
_ = require "lodash"
server = true

if typeof window != "undefined"
  PIXI = require "pixi.js"
  jQuery = require "jquery"
  server = false

class Game
  constructor: (options = {}) ->
    @states = []
    @deltaTime = 0
    @running = true

    unless server
      @container = jQuery(options.container || "body")
      @stage = @createStage()
      @renderer = @createRenderer()

      @container.html @renderer.view

    @scheduleNext @tick.bind(this)

  tick: (time) ->
    if @running
      @deltaTime = time - (@lastUpdateTime || time)
      @lastUpdateTime = time

      @update()
      @render() unless server

      @scheduleNext @tick.bind(this)

  update: ->
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

  createStage: ->
    new PIXI.Stage(0x000000)

  createRenderer: ->
    PIXI.autoDetectRenderer(@container.width(), @container.height())

  scheduleNext: (callback) ->
    if server
      process.nextTick callback
    else
      requestAnimationFrame callback

module.exports = Game
