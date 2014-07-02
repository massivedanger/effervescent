var Sprite = {
  create: function(image) {
    var texture = PIXI.Texture.fromImage(image);
    return new PIXI.Sprite(texture);
  }
};

module.exports = Sprite;
