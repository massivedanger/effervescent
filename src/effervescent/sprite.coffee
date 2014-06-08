Sprite =
  fromImage: (image) ->
    texture = PIXI.Texture.fromImage image
    return new PIXI.Sprite texture

module.exports = Sprite
