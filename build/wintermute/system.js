var System;

System = (function() {
  function System() {
    this.world = null;
  }

  System.prototype.update = function(delta) {
    throw new Error('Override #update');
  };

  return System;

})();

module.exports = System;
