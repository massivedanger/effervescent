var _ = require("lodash");
var p2 = require("p2");
var server = typeof window === "undefined";
var Class = require('jsclass/src/core').Class;

var Game = new Class({
  initialize: function(options) {
    if (options == null) {
      options = {};
    }
    this.states = [];
    this.deltaTime = 0;
    this.running = true;
    if (!server) {
      this.setupGraphics();
    }
    if (options.physics) {
      this.setupPhysics(options.physics);
    }
    this.scheduleNext(this.tick.bind(this));
  },

  tick: function(time) {
    if (this.running) {
      this.deltaTime = time - (this.lastUpdateTime || time);
      this.lastUpdateTime = time;
      this.update();
      if (!server) {
        this.render();
      }
      return this.scheduleNext(this.tick.bind(this));
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
    return this.renderer.render(this.stage);
  },

  addChildToStage: function(child) {
    return this.stage.addChild(child);
  },

  removeChildFromStage: function(child) {
    return this.stage.removeChild(child);
  },

  pushState: function(state) {
    state.game = this;
    return this.states.push(state);
  },

  popState: function() {
    var state;
    state = this.states.pop();
    state.game = null;
    return state;
  },

  changeState: function(state) {
    state.game = this;
    return this.states = [state];
  },

  getCurrentState: function() {
    return _.last(this.states);
  },

  setupGraphics: function() {
    var el;

    this.container = jQuery((el = options.container) != null ? el : "body");
    this.stage = this.createStage();
    this.renderer = this.createRenderer();
    this.container.append(this.renderer.view);
  },

  createStage: function() {
    return new PIXI.Stage(0x000000);
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
      return process.nextTick(callback);
    } else {
      return requestAnimationFrame(callback);
    }
  }
});

module.exports = Game;