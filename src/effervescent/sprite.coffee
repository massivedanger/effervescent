PIXI = require "pixi.js"

class Sprite
  constructor: (options = {}) ->
    texture = PIXI.Texture.fromImage options.image
    @sprite = new PIXI.Sprite texture

module.exports = Sprite
