describe("Entity", function() {
  var Camera = requireFromSrc("effervescent/camera");
  var camera = null;

  beforeEach(function() {
    var container = {
      getBounds: function() {}
    };

    camera = new Camera(container);
  });

  it("moves toward its target while updating", function() {
    var currentPosition = camera.position.clone();
    camera.targetPosition.set({ x: 60, y: -100 });
    camera.update(0.016);

    expect(!camera.position.equal(currentPosition));
  });
});
