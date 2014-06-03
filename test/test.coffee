require "coffee-script/register"
path = require "path"

global.requireFromSrc = (file) ->
  require path.join(__dirname, "..", "src", file)

global.chai = require "chai"
global.expect = global.chai.expect

global.sinon = require "sinon"
sinonChai = require "sinon-chai"

global.chai.use sinonChai
