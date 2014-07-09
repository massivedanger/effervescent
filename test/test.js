var path = require("path");

global.requireFromSrc = function(file) {
  return require(path.join(__dirname, "..", "src", file));
}

global.getFixturePath = function(file) {
  if (!file) {
    file = "";
  }

  return path.join(__dirname, "fixtures", file);
}

global.chai = require("chai");
global.chai.use(require("sinon-chai"));

global.expect = global.chai.expect;
global.sinon = require("sinon");
