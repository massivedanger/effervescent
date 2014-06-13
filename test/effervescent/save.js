describe("Save", function() {
  var Datastore = require("nedb");
  var Player = requireFromSrc("effervescent/player");
  Player.getFilePath = getFixturePath;

  var Save = requireFromSrc("effervescent/save");
  var save = null;

  it("can get all saves", function() {
    Save.getAll(function(err, saves) {
      expect(saves).to.have.length(1);
      expect(saves).to.be.a('array');
      expect(saves[0]).to.be.an.instanceOf(Save);
    });
  });

  it("has a directory", function() {
    expect(Save.getDirectory()).to.be.a('string');
  });

  it("can instantiated with a directory", function() {
    save = new Save(getFixturePath("saves/test"));

    expect(save).to.be.an.instanceOf(Save);
    expect(save.databases).to.be.a('object');
  });

  it("can add a database", function() {
    save = new Save(getFixturePath("saves/test"));
    save.addDatabase("test");

    expect(save.databases.test).to.be.an.instanceOf(Datastore);
  });
});
