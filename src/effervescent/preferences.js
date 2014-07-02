var Player = require('./player');
var Datastore = require('nedb');
var fse = require('fs-extra');
var Base = require('./base');

var Preferences = Base.extend({
  constructor: function(name) {
    this.name = typeof name !== 'undefined' ? name : 'preferences';
    this.file = Player.getFilePath(this.name + '.db');
    this.data = new Datastore({
      filename: this.file,
      autoload: true
    });
  },

  get: function(name, callback) {
    this.data.findOne({ name: name }, function(err, doc) {
      callback(err, doc.value);
    });
  },

  set: function(name, value) {
    this.data.findOne({ name: name }, (function(err, doc) {
      var newRecord = { name: name, value: value };
      if (doc) {
        this.data.update({ name: name }, newRecord);
      } else {
        this.data.insert(newRecord);
      }
    }).bind(this));
  },

  remove: function(name) {
    this.data.remove({ name: name });
  }
});

Preferences.createFromTemplate = function(file, name, callback) {
  var destination = Player.getFilePath(name + '.db');

  fse.copy(file, destination, function(err) {
    if (callback) {
      return callback(err, new Preferences(name));
    }
  });
}

module.exports = Preferences;
