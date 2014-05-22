var Vector2;

Vector2 = (function() {
  function Vector2(x, y) {
    this.set(x, y);
  }

  Vector2.prototype.set = function(x, y) {
    this.x = x;
    return this.y = y;
  };

  Vector2.prototype.clone = function() {
    return new Vector2(this.x, this.y);
  };

  Vector2.prototype.equal = function(other) {
    return other.x === this.x && other.y === this.y;
  };

  Vector2.prototype.angleTo = function(other) {
    return Math.atan2(this.y - other.y, this.x - other.x);
  };

  return Vector2;

})();

module.exports = Vector2;
