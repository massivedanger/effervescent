var Wintermute;

Wintermute = {
  server: true,
  Game: require("./wintermute/game"),
  Entity: require("./wintermute/entity"),
  System: require("./wintermute/system"),
  Component: require("./wintermute/component"),
  Family: require("./wintermute/family"),
  Vector2: require("./wintermute/vector2")
};

if (typeof window !== "undefined") {
  Wintermute.server = false;
  Wintermute.PIXI = require("pixi.js");
  Wintermute.Zepto = require("zepto-browserify");
  ({
    Sprite: require("./wintermute/sprite")
  });
}

module.exports = Wintermute;
