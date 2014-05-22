Wintermute =
  # Core
  Game: require "./wintermute/game"
  Sprite: require "./wintermute/sprite"

  # ECS
  Entity: require "./wintermute/entity"
  System: require "./wintermute/system"
  Component: require "./wintermute/component"
  Family: require "./wintermute/family"

  # Math
  Vector2: require "./wintermute/vector2"

  # Browser libs
  PIXI: require "pixi.js"
  Zepto: require "zepto-browserify"

module.exports = Wintermute
