describe('Preferences', function() {
  var Datastore = require('nedb');
  var Player = requireFromSrc('effervescent/player');
  Player.getFilePath = getFixturePath;

  var Preferences = requireFromSrc('effervescent/preferences');
  var preferences = null;

  beforeEach(function() {
    preferences = new Preferences();
  });

  it('can instantiated', function() {
    expect(preferences).to.be.an.instanceOf(Preferences);
    expect(preferences.data).to.be.a('object');
  });
});
