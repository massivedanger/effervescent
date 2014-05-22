require "coffee-script/register"

global.chai = require "chai"
global.expect = global.chai.expect

global.sinon = require "sinon"
sinonChai = require "sinon-chai"

global.chai.use sinonChai
