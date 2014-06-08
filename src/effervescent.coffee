Effervescent =
  # Core
  Game: require "./effervescent/game"

  # ECS
  Entity: require "./effervescent/entity"
  System: require "./effervescent/system"
  Component: require "./effervescent/component"
  Family: require "./effervescent/family"

  # Math
  Vector2: require "./effervescent/vector2"

  # Physics
  Physics: require "./effervescent/physics"

  # Data
  Datastore: require "nedb"
  Player: require "./effervescent/player"
  Preferences: require "./effervescent/preferences"

  logger: require "./effervescent/logger"

if typeof window != "undefined"
  global.PIXI = require "pixi.js" unless window.PIXI
  global.jQuery = require "jquery" unless window.jQuery

  # Graphics
  Effervescent.Sprite = require "./effervescent/sprite"

  # Input
  Effervescent.Input = require "./effervescent/input"

module.exports = Effervescent
