State = require "./state"
_ = require "lodash"

if typeof window != "undefined"
  PIXI = require "pixi.js"
  Zepto = require "zepto-browserify"

class Game
  constructor: (options = {}) ->
    @states = []
    @deltaTime = 0
    @running = true
    @server = true

    if PIXI and Zepto
      @server = false
      @container = Zepto.$ options.container
      @stage = createStage()
      @renderer = createRenderer()

      @container.html @renderer.view

  run: ->
    while @running
      time = Date.now()
      @deltaTime = time - (@deltaTime || time)

      @update()
      @render()

  pushState: (state) ->
    @states.push state

  popState: (state) ->
    @states.pop()

  changeState: (state) ->
    @states = [state]

  getCurrentState: ->
    _.last @states

  update: ->
    for state in @states
      state.update @deltaTime

  render: ->
    return unless not @server

    requestAnimationFrame ->
      @renderer.render @stage

  createStage: ->
    new PIXI.Stage(0x000000)

  createRenderer: ->
    PIXI.autoDetectRenderer(@container.width(), @container.height())

module.exports = Game
