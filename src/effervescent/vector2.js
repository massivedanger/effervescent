var _ = require("lodash"),
    Class = require("jsclass/src/core").Class,
    postal = require("postal");

var Vector2 = new Class({
  extend: {
    radiansToDegrees: 57.2957795
  },

  initialize: function(x, y) {
    this.set({ x: (x || 0.0), y: (y || 0.0) });
  },

  set: function(vector) {
    this.x = vector.x;
    this.y = vector.y;

    return this;
  },

  clone: function() {
    return new Vector2(this.x, this.y);
  },

  equal: function(other) {
    return other.x === this.x && other.y === this.y;
  },

  copyFrom: function(other) {
    return this.set({ x: other.x, y: other.y });
  },

  add: function(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  },

  subtract: function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  },

  multiply: function(vector) {
    this.x *= vector.x;
    this.y *= vector.y;

    return this;
  },

  divide: function(vector) {
    this.x /= vector.x;
    this.y /= vector.y;

    return this;
  },

  magnitude: function() {
    return hypot(this.x, this.y);
  },

  angle: function(options) {
    if (options == null) {
      options = {};
    }

    var angle = Math.atan2(this.y, this.x);

    if (options.degrees) {
      return radiansToDegrees(angle);
    } else {
      return angle;
    }
  },

  angleTo: function(other, options) {
    if (options == null) {
      options = {};
    }

    var angle = Math.atan2(this.y - other.y, this.x - other.x);

    if (options.degrees) {
      return radiansToDegrees(angle);
    } else {
      return angle;
    }
  },

  cross: function(other) {
    return (this.x * other.y) - (this.y * other.x);
  },

  dot: function(other) {
    return (this.x * other.x) + (this.y * other.y);
  },

  clamp: function(options) {
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
  },

  rotate: function(rotation, options) {
    if (options == null) {
      options = {};
    }
    if (options.degrees) {
      rotation /= Vector2.radiansToDegrees;
    }

    var originalMagnitude = this.magnitude();

    this.x = Math.cos(rotation) * originalMagnitude;
    this.y = Math.sin(rotation) * originalMagnitude;

    return this;
  },

  lerp: function(vector, amount) {
    if (this.equal(vector) {
      return this;
    }

    if (amount == null) {
      amount = 1;
    }

    this.x = lerp(this.x, vector.x, amount);
    this.y = lerp(this.y, vector.y, amount);

    return this;
  }
});

var hypot = function(a, b) {
  if (a === 0) {
    return Math.abs(b);
  } else {
    return Math.abs(a) * Math.sqrt(1 + Math.pow(b / a, 2));
  }
}

var radiansToDegrees = function(radians) {
  return radians * Vector2.radiansToDegrees;
}

var clampNumber = function(number, options) {
  if (options == null) {
    options = {};
  }

  var min = options.min || 0,
      max = options.max || 1;

  if (number < min) {
    return min;
  } else if (number > max) {
    return max;
  } else {
    return number;
  }
}

var lerp = function(a, b, amount) {
    return (1 - amount) * a + amount * b;
};

module.exports = Vector2;
