Wintermute =
  # Core
  Game: require "./wintermute/game"

  # ECS
  Entity: require "./wintermute/entity"
  System: require "./wintermute/system"
  Component: require "./wintermute/component"
  Family: require "./wintermute/family"

  # Math
  Vector2: require "./wintermute/vector2"

if typeof window != "undefined"
  # Browser libs
  Wintermute.PIXI = require "pixi.js"
  Wintermute.Zepto = require "zepto-browserify"

  # Graphics
  Sprite: require "./wintermute/sprite"

  # Input
  Input: require "./wintermute/input"

module.exports = Wintermute
