var Wintermute;

Wintermute = {
  Game: require("./wintermute/game"),
  Sprite: require("./wintermute/sprite"),
  Entity: require("./wintermute/entity"),
  System: require("./wintermute/system"),
  Component: require("./wintermute/component"),
  Family: require("./wintermute/family"),
  Vector2: require("./wintermute/vector2"),
  PIXI: require("pixi.js"),
  Zepto: require("zepto-browserify")
};

module.exports = Wintermute;
