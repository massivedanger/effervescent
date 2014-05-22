var Signal,
  __slice = [].slice;

Signal = (function() {
  function Signal() {
    this._listeners = [];
  }

  Signal.prototype.hasListeners = function() {
    return this._listeners.length > 0;
  };

  Signal.prototype.add = function(listener) {
    return this._listeners.push(listener);
  };

  Signal.prototype.remove = function(listener) {
    var index;
    index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
      return true;
    } else {
      return false;
    }
  };

  Signal.prototype.emit = function() {
    var listener, messages, _i, _len, _ref, _results;
    messages = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _ref = this._listeners;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      _results.push(listener.apply(null, messages));
    }
    return _results;
  };

  return Signal;

})();

module.exports = Signal;
