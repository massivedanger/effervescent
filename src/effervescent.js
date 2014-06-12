var jsclass = require('jsclass/src/core');

var Effervescent = {
  Game: require("./effervescent/game"),
  Entity: require("./effervescent/entity"),
  System: require("./effervescent/system"),
  Component: require("./effervescent/component"),
  Family: require("./effervescent/family"),
  Vector2: require("./effervescent/vector2"),
  Physics: require("./effervescent/physics"),
  Datastore: require("nedb"),
  Player: require("./effervescent/player"),
  Preferences: require("./effervescent/preferences"),
  logger: require("./effervescent/logger"),
  Class: jsclass.Class,
  Module: jsclass.Module
};

if (typeof window !== "undefined") {
  global.PIXI = require("pixi.js");
  global.jQuery = require("jquery");
  Effervescent.Sprite = require("./effervescent/sprite");
  Effervescent.Input = require("./effervescent/input");
}

module.exports = Effervescent;
