var Vector2;

Vector2 = (function() {
  var clampNumber, hypot, radiansToDegrees;

  Vector2.radiansToDegrees = 57.2957795;

  function Vector2(x, y) {
    if (x == null) {
      x = 0.0;
    }
    if (y == null) {
      y = 0.0;
    }
    this.set(x, y);
  }

  Vector2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  };

  Vector2.prototype.clone = function() {
    return new Vector2(this.x, this.y);
  };

  Vector2.prototype.equal = function(other) {
    return other.x === this.x && other.y === this.y;
  };

  Vector2.prototype.copyFrom = function(other) {
    return this.set(other.x, other.y);
  };

  Vector2.prototype.add = function(x, y) {
    if (x == null) {
      x = 0.0;
    }
    if (y == null) {
      y = 0.0;
    }
    this.x += x;
    this.y += y;
    return this;
  };

  Vector2.prototype.subtract = function(x, y) {
    if (x == null) {
      x = 0.0;
    }
    if (y == null) {
      y = 0.0;
    }
    this.x -= x;
    this.y -= y;
    return this;
  };

  Vector2.prototype.multiply = function(x, y) {
    if (x == null) {
      x = 1;
    }
    if (y == null) {
      y = 1;
    }
    this.x *= x;
    this.y *= y;
    return this;
  };

  Vector2.prototype.divide = function(x, y) {
    if (x == null) {
      x = 1;
    }
    if (y == null) {
      y = 1;
    }
    this.x /= x;
    this.y /= y;
    return this;
  };

  Vector2.prototype.magnitude = function() {
    return hypot(this.x, this.y);
  };

  Vector2.prototype.angle = function(options) {
    var angle;
    if (options == null) {
      options = {};
    }
    angle = Math.atan2(this.y, this.x);
    if (options.degrees) {
      return radiansToDegrees(angle);
    } else {
      return angle;
    }
  };

  Vector2.prototype.angleTo = function(other, options) {
    var angle;
    if (options == null) {
      options = {};
    }
    angle = Math.atan2(this.y - other.y, this.x - other.x);
    if (options.degrees) {
      return radiansToDegrees(angle);
    } else {
      return angle;
    }
  };

  Vector2.prototype.cross = function(other) {
    return (this.x * other.y) - (this.y * other.x);
  };

  Vector2.prototype.dot = function(other) {
    return (this.x * other.x) + (this.y * other.y);
  };

  Vector2.prototype.clamp = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.x) {
      this.x = clampNumber(this.x, {
        min: options.x[0],
        max: options.x[1]
      });
    }
    if (options.y) {
      this.y = clampNumber(this.y, {
        min: options.y[0],
        max: options.y[1]
      });
    }
    if (options.all) {
      this.x = clampNumber(this.x, {
        min: options.all[0],
        max: options.all[1]
      });
      this.y = clampNumber(this.y, {
        min: options.all[0],
        max: options.all[1]
      });
    }
    return this;
  };

  Vector2.prototype.rotate = function(rotation, options) {
    var originalMagnitude;
    if (options == null) {
      options = {};
    }
    if (options.degrees) {
      rotation /= Vector2.radiansToDegrees;
    }
    originalMagnitude = this.magnitude();
    this.x = Math.cos(rotation) * originalMagnitude;
    this.y = Math.sin(rotation) * originalMagnitude;
    return this;
  };

  hypot = function(a, b) {
    if (a === 0) {
      return Math.abs(b);
    } else {
      return Math.abs(a) * Math.sqrt(1 + Math.pow(b / a, 2));
    }
  };

  radiansToDegrees = function(radians) {
    return radians * Vector2.radiansToDegrees;
  };

  clampNumber = function(number, options) {
    var max, min, _ref, _ref1;
    if (options == null) {
      options = {};
    }
    min = (_ref = options.min) != null ? _ref : 0;
    max = (_ref1 = options.max) != null ? _ref1 : 1;
    if (number < min) {
      return min;
    } else if (number > max) {
      return max;
    } else {
      return number;
    }
  };

  return Vector2;

})();

module.exports = Vector2;
