var Effervescent = {
  Base: require('./effervescent/base');
  Game: require('./effervescent/game'),
  Entity: require('./effervescent/entity'),
  System: require('./effervescent/system'),
  Component: require('./effervescent/component'),
  Family: require('./effervescent/family'),
  Geometry: require('./effervescent/geometry'),
  Physics: require('./effervescent/physics'),
  Player: require('./effervescent/player'),
  Preferences: require('./effervescent/preferences'),
  Save: require('./effervescent/save'),

  logger: require('./effervescent/logger'),

  Datastore: require('nedb'),
};

if (typeof window !== 'undefined') {
  global.PIXI = require('pixi.js');
  global.jQuery = require('jquery');
  Effervescent.Display = require('./effervescent/display');
  Effervescent.Input = require('./effervescent/input');
}

module.exports = Effervescent;
