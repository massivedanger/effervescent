describe("Body", function() {
  var p2 = require("p2");
  var Body = requireFromSrc("effervescent/physics/body");
  var body = null;

  beforeEach(function() {
    body = new Body();
  });

  it("has a P2 rectangular body by default", function() {
    expect(body.body).to.be.an.instanceOf(p2.Body);

    expect(body.body.shapes[0]).to.be.an.instanceOf(p2.Rectangle);
  });

  it("can have a circular body", function() {
    body = new Body({
      shape: "circle",
      radius: 20
    });

    expect(body.body).to.be.an.instanceOf(p2.Body);
    expect(body.body.shapes[0]).to.be.an.instanceOf(p2.Circle);
  });

  it("can have a capsular body", function() {
    body = new Body({
      shape: "capsule",
      length: 100,
      radius: 20
    });

    expect(body.body).to.be.an.instanceOf(p2.Body);
    expect(body.body.shapes[0]).to.be.an.instanceOf(p2.Capsule);
  });
});
