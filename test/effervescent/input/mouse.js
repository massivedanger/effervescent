describe("Mouse", function() {
  var Mouse = requireFromSrc("effervescent/input/mouse");
  var window = null;

  beforeEach(function() {
    window = {
      addEventListener: sinon.spy(),
      removeEventListener: sinon.spy()
    };
  });

  it("has a default position", function() {
    expect(Mouse.position.x).to.be.equal(0);
    expect(Mouse.position.y).to.be.equal(0);
  });
});
