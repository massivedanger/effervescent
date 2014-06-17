describe("Rectangle", function() {
  var Rectangle = requireFromSrc("effervescent/rectangle");
  var Vector2 = requireFromSrc("effervescent/vector2");

  var rectangle = null;

  beforeEach(function() {
    rectangle = new Rectangle();
  });

  it("can check if a point is within it", function() {
    var point1 = new Vector2(0, 0);
    var point2 = new Vector2(1280, 900);

    expect(rectangle.within(point1)).to.be.true;
    expect(rectangle.within(point2)).to.be.false;
  });
});
