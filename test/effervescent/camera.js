describe("Camera", function() {
  var Camera = requireFromSrc("effervescent/camera");
  var Rectangle = requireFromSrc("effervescent/rectangle");

  var camera = null;

  beforeEach(function() {
    var container = {
      getBounds: function() {
        return new Rectangle({
          x: -100,
          y: 100,
          width: 3000,
          height: 3000
        });
      },
      position: { x: 0, y: 0 }
    };

    camera = new Camera(container);
  });

  it("moves toward its target while updating", function() {
    var currentPosition = camera.position.clone();
    camera.setTargetPosition({ x: 60, y: -100 });
    camera.update(0.016);

    expect(!camera.position.equal(currentPosition));
  });

  it("can follow an object with an X and Y", function() {

  });
});
