var Player = require("./player");
var Class = require('jsclass/src/core').Class;
var fse = require("fs-extra");

var Preferences = new Class({
  extend: {
    createFromTemplate: function(file, name, callback) {
      var destination;
      if (callback == null) {
        callback = null;
      }
      destination = Player.filePath("" + name + ".json");
      fs.copy(file, destination, function(err) {
        return console.error("Error creating preferences from template! " + err);
      });
      if (callback) {
        return callback.call(new Preferences(name));
      }
    }
  },

  initialize: function(name) {
    this.name = name != null ? name : 'preferences';
    this.file = Player.filePath("" + this.name + ".json");
    fse.createFile(this.file, function(err) {
      if (!err) {
        return fse.readJson(this.file, function(err, data) {
          if (err) {
            console.error(err);
          }
          return this.data = data;
        });
      }
    });
  },

  save: function() {
    return fse.outputJson(this.file, this.data, function(err) {
      if (err) {
        return console.error(err);
      }
    });
  }
});

module.exports = Preferences;
