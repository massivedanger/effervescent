var _ = require('lodash');
var p2 = require('p2');
var server = typeof window === 'undefined';
var Base = require('./base');
var Camera = require('./display/camera');

var Game = Base.extend({
  constructor: function(options) {
    if (options == null) {
      options = {};
    }

    this.states = [];
    this.deltaTime = 0;
    this.running = true;

    if (!server) {
      this.setupGraphics(options);
    }

    if (options.physics) {
      this.setupPhysics(options.physics);
    }

    this.scheduleNext(this.tick.bind(this));
  },

  tick: function() {
    if (this.running) {
      var time = Date.now();
      this.deltaTime = (time - (this.lastUpdateTime || time)) / 1000;
      this.lastUpdateTime = time;
      this.update();

      if (!server) {
        this.render();
      }

      this.scheduleNext(this.tick.bind(this));
    }
  },

  update: function() {
    if (this.physics && this.physics.enabled) {
      this.physics.world.update(this.deltaTime);
    }

    this.states.forEach(function(state) {
      state.update(this.deltaTime);
    });
  },

  render: function() {
    this.renderer.render(this.stage);
  },

  addChild: function(child) {
    return this.objectContainer.addChild(child);
  },

  removeChild: function(child) {
    return this.objectContainer.removeChild(child);
  },

  pushState: function(state) {
    state.game = this;
    this.states.push(state);
    state.entered();
  },

  popState: function() {
    var state = this.states.pop();
    state.game = null;
    state.exited();

    return state;
  },

  changeState: function(state) {
    state.game = this;
    this.states = [state];
    state.entered();
  },

  getCurrentState: function() {
    return _.last(this.states);
  },

  setupGraphics: function(options) {
    var el;

    this.container = jQuery((el = options.container) != null ? el : 'body');
    this.stage = this.createStage();
    this.objectContainer = this.createObjectContainer();
    this.renderer = this.createRenderer();
    this.camera = new Camera(this.objectContainer);

    this.container.append(this.renderer.view);
  },

  createStage: function() {
    return new PIXI.Stage(0x000000);
  },

  createObjectContainer: function() {
    var objectContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(objectContainer);

    return objectContainer;
  },

  createRenderer: function() {
    return PIXI.autoDetectRenderer(this.container.width(), this.container.height());
  },

  setupPhysics: function(options) {
    if (options == null) {
      options = {};
    }

    var gravity, enabled;
    this.physics = {
      world: new Physics.World({
        gravity: (gravity = options.gravity) != null ? gravity : [0, 0]
      }),
      enabled: (enabled = options.enabled) != null ? enabled : true
    };
  },

  scheduleNext: function(callback) {
    if (server) {
      return setImmediate(callback);
    } else {
      return requestAnimationFrame(callback);
    }
  }
});

module.exports = Game;
