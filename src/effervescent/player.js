var Player = {
  gameName: function() {
    try {
      var config;
      return ((config = require(path.join(resourcesPath, 'game.json'))) != null ? config.name : void 0) || 'Effervescent Game';
    } catch (e) {
      return 'Effervescent Game';
    }
  },

  getFilePath: function(file) {
    if (file == null) {
      file = '';
    }

    var platformSpecific = (function() {
      switch (os.platform()) {
        case 'darwin':
          return '/Library/Application Support/' + this.gameName();
        case 'linux':
          return '.config/' + (slugify(this.gameName()));
        case 'win32':
          return '/AppData/' + this.gameName();
      }
    }).apply(this);

    return path.join(homeDirectory, platformSpecific, file);
  }
};

var os = require('os');
var path = require('path');
var resourcesPath = process.resourcesPath ? path.join(process.resourcesPath, 'app') : process.cwd();
var homeDirectory = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

var slugify = function(text, seperator) {
  if (seperator == null) {
    seperator = '_';
  }

  return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/\s+/g, seperator);
};

module.exports = Player;
