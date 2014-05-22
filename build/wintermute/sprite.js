var Sprite;

Sprite = (function() {
  function Sprite(options) {
    if (options == null) {
      options = {};
    }
    this.image = options.image;
  }

  return Sprite;

})();

module.exports = Sprite;
