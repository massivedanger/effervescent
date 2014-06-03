Effervescent =
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
  Effervescent.PIXI = require "pixi.js"
  Effervescent.jQuery = require "jquery"

  # Graphics
  Effervescent.Sprite = require "./wintermute/sprite"

  # Input
  Effervescent.Input = require "./wintermute/input"

module.exports = Effervescent
