var _ = require("lodash");
var Class = require("jsclass/src/core").Class;
var Player = require('./player');
var Datastore = require("nedb");

var fse = require("fs-extra");
var path = require("path");

var isDirectory = function(dir) {
  return fse.lstatSync(dir).isDirectory();
}

var Save = new Class({
  extend: {
    getDirectory: function() {
      return Player.getFilePath("saves");
    },

    getAll: function(callback) {
      var directory = this.getDirectory();
      fse.readdir(directory, function(err, files) {
        saves = files.map(function(file) {
          return path.join(directory, file);
        }).filter(function(file) {
          return isDirectory(file) == true;
        }).map(function(file) {
          return new Save(file);
        });

        return callback(err, saves);
      });
    }
  },

  initialize: function(directory, callback) {
    this.directory = directory;
    this.databases = {};

    fse.mkdirs(this.directory, (function(err, directory) {
      if (callback) {
        callback.apply(this);
      }
    }).bind(this));
  },

  addDatabase: function(name) {
    this.databases[name] = new Datastore({
      filename: path.join(this.directory, name + '.db'),
      autoload: true
    });

    return this;
  }
});

module.exports = Save;
