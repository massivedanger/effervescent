var Sprite;

Sprite = {
  create: function(image) {
    var texture;
    texture = PIXI.Texture.fromImage(image);
    return new PIXI.Sprite(texture);
  }
};

module.exports = Sprite;
