describe("Vector2", function() {
  var Vector2, vector;
  Vector2 = requireFromSrc("effervescent/vector2");
  vector = null;
  beforeEach(function() {
    return vector = new Vector2();
  });
  it("has a zero x and y by default", function() {
    expect(vector.x).to.be.equal(0);
    return expect(vector.y).to.be.equal(0);
  });
  it("can set both coordinates", function() {
    vector.set(20, 30);
    expect(vector.x).to.be.equal(20);
    return expect(vector.y).to.be.equal(30);
  });
  it("can be cloned!", function() {
    var newVector;
    vector.set(33, 99);
    newVector = vector.clone();
    expect(newVector.x).to.be.equal(33);
    return expect(newVector.y).to.be.equal(99);
  });
  it("can be checked for equality", function() {
    var newVector;
    newVector = vector.clone();
    return expect(newVector.equal(vector)).to.be.true;
  });
  it("can copy coordinates from another", function() {
    var newVector;
    newVector = new Vector2(66, 99);
    expect(newVector.x).to.be.equal(66);
    expect(newVector.y).to.be.equal(99);
    newVector.copyFrom(vector);
    expect(newVector.x).to.be.equal(0);
    return expect(newVector.y).to.be.equal(0);
  });
  it("can add", function() {
    vector.set(20, 30);
    vector.add(20, 30);
    expect(vector.x).to.be.equal(40);
    return expect(vector.y).to.be.equal(60);
  });
  it("can add", function() {
    vector.set(20, 30);
    vector.subtract(10, 15);
    expect(vector.x).to.be.equal(10);
    return expect(vector.y).to.be.equal(15);
  });
  it("can multiply", function() {
    vector.set(20, 30);
    vector.multiply(2, 3);
    expect(vector.x).to.be.equal(40);
    return expect(vector.y).to.be.equal(90);
  });
  it("can divide", function() {
    vector.set(20, 30);
    vector.divide(2, 3);
    expect(vector.x).to.be.equal(10);
    return expect(vector.y).to.be.equal(10);
  });
  it("has a magnitude", function() {
    vector.set(20, 30);
    return expect(vector.magnitude()).to.be.within(36.0, 36.1);
  });
  it("has an angle", function() {
    vector.set(20, 20);
    return expect(vector.angle()).to.be.within(0.78, 0.79);
  });
  it("has an angle in degrees", function() {
    vector.set(20, 20);
    return expect(vector.angle({
      degrees: true
    })).to.be.within(44.9, 50.0);
  });
  it("get an angle to another vector in radians", function() {
    var other;
    other = new Vector2(99, 300);
    return expect(vector.angleTo(other)).to.be.within(-1.89, -1.88);
  });
  it("get an angle to another vector in degrees", function() {
    var other, radians;
    other = new Vector2(99, 300);
    radians = vector.angleTo(other);
    return expect(vector.angleTo(other, {
      degrees: true
    })).to.equal(radians * Vector2.radiansToDegrees);
  });
  it("can get a cross product", function() {
    var other;
    other = new Vector2(30, 15);
    vector.set(10, -90);
    return expect(vector.cross(other)).to.be.equal(2850);
  });
  it("can get a dot product", function() {
    var other;
    other = new Vector2(99, 40);
    vector.set(11, 32);
    return expect(vector.dot(other)).to.be.equal(2369);
  });
  it("can be clamped", function() {
    var clamped;
    vector.set(75, 10);
    clamped = vector.clamp({
      x: [0, 100],
      y: [0, 5]
    });
    expect(clamped.x).to.be.equal(75);
    return expect(clamped.y).to.be.equal(5);
  });
  it("can be clamped only on X", function() {
    var clamped;
    vector.set(75, 10);
    clamped = vector.clamp({
      x: [0, 100]
    });
    expect(clamped.x).to.be.equal(75);
    return expect(clamped.y).to.be.equal(10);
  });
  it("can be clamped only on Y", function() {
    var clamped;
    vector.set(75, 10);
    clamped = vector.clamp({
      y: [0, 1]
    });
    expect(clamped.x).to.be.equal(75);
    return expect(clamped.y).to.be.equal(1);
  });
  it("can be clamped on all", function() {
    var clamped;
    vector.set(75, 10);
    clamped = vector.clamp({
      all: [0, 5]
    });
    expect(clamped.x).to.be.equal(5);
    return expect(clamped.y).to.be.equal(5);
  });
  it("can be rotated", function() {
    vector.set(20, 30);
    vector.rotate(1);
    expect(vector.x).to.be.within(19.4, 19.5);
    return expect(vector.y).to.be.within(30.3, 30.4);
  });
  return it("can be rotated by degrees", function() {
    vector.set(20, 20);
    vector.rotate(45, {
      degrees: true
    });
    expect(vector.x).to.be.within(19.9, 20.0);
    return expect(vector.y).to.be.within(20.0, 20.1);
  });
});
