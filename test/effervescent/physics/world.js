describe("World", function() {
  var World, p2, world;
  p2 = require("p2");
  World = requireFromSrc("effervescent/physics/world");
  world = null;
  beforeEach(function() {
    return world = new World();
  });
  return it("has a P2 world by default", function() {
    return expect(world.world).to.be.an.instanceOf(p2.World);
  });
});
