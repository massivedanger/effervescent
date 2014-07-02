describe('Vector2', function() {
  var Vector2 = requireFromSrc('effervescent/geometry/vector2'),
      vector = null;

  beforeEach(function() {
    vector = new Vector2();
  });

  it('has a zero x and y by default', function() {
    expect(vector.x).to.be.equal(0);
    expect(vector.y).to.be.equal(0);
  });

  it('can set both coordinates', function() {
    vector.set({ x: 20,  y: 30 });

    expect(vector.x).to.be.equal(20);
    expect(vector.y).to.be.equal(30);
  });

  it('can be cloned!', function() {
    vector.set({ x: 33, y: 99 });
    var newVector = vector.clone();

    expect(newVector.x).to.be.equal(33);
    expect(newVector.y).to.be.equal(99);
  });

  it('can be checked for equality', function() {
    var newVector = vector.clone();

    expect(newVector.equal(vector)).to.be.true;
  });

  it('can copy coordinates from another', function() {
    var newVector = new Vector2(66, 99);

    expect(newVector.x).to.be.equal(66);
    expect(newVector.y).to.be.equal(99);

    newVector.copyFrom(vector);

    expect(newVector.x).to.be.equal(0);
    expect(newVector.y).to.be.equal(0);
  });

  it('can add', function() {
    vector.set({ x: 20, y: 30 });
    vector.add({ x: 20, y: 30 });

    expect(vector.x).to.be.equal(40);
    expect(vector.y).to.be.equal(60);
  });

  it('can add', function() {
    vector.set({ x: 20, y: 30 });
    vector.subtract({ x: 10, y: 15 });

    expect(vector.x).to.be.equal(10);
    expect(vector.y).to.be.equal(15);
  });

  it('can multiply', function() {
    vector.set({ x: 20, y: 30 });
    vector.multiply({ x: 2, y: 3 });

    expect(vector.x).to.be.equal(40);
    expect(vector.y).to.be.equal(90);
  });

  it('can divide', function() {
    vector.set({ x: 20, y: 30 });
    vector.divide({ x: 2, y: 3 });

    expect(vector.x).to.be.equal(10);
    expect(vector.y).to.be.equal(10);
  });

  it('has a magnitude', function() {
    vector.set({ x: 20, y: 30 });

    expect(vector.magnitude()).to.be.within(36.0, 36.1);
  });

  it('has an angle', function() {
    vector.set({ x: 20, y: 20 });
    expect(vector.angle()).to.be.within(0.78, 0.79);
  });

  it('has an angle in degrees', function() {
    vector.set({ x: 20, y: 20 });
    expect(vector.angle({
      degrees: true
    })).to.be.within(44.9, 50.0);
  });

  it('get an angle to another vector in radians', function() {
    var other = new Vector2(99, 300);
    expect(vector.angleTo(other)).to.be.within(-1.89, -1.88);
  });

  it('get an angle to another vector in degrees', function() {
    var other = new Vector2(99, 300),
        radians = vector.angleTo(other);

    expect(vector.angleTo(other, {
      degrees: true
    })).to.equal(radians * Vector2.radiansToDegrees);
  });

  it('can get a cross product', function() {
    var other = new Vector2(30, 15);
    vector.set({ x: 10, y: -90 });

    expect(vector.cross(other)).to.be.equal(2850);
  });

  it('can get a dot product', function() {
    var other = new Vector2(99, 40);
    vector.set({ x: 11, y: 32 });

    expect(vector.dot(other)).to.be.equal(2369);
  });

  it('can be clamped', function() {
    vector.set({ x: 75, y: 10 });
    var clamped = vector.clamp({
      x: [0, 100],
      y: [0, 5]
    });

    expect(clamped.x).to.be.equal(75);
    expect(clamped.y).to.be.equal(5);
  });

  it('can be clamped only on X', function() {
    vector.set({ x: 75, y: 10 });
    var clamped = vector.clamp({
      x: [0, 100]
    });

    expect(clamped.x).to.be.equal(75);
    expect(clamped.y).to.be.equal(10);
  });

  it('can be clamped only on Y', function() {
    vector.set({ x: 75, y: 10 });
    var clamped = vector.clamp({
      y: [0, 1]
    });

    expect(clamped.x).to.be.equal(75);
    expect(clamped.y).to.be.equal(1);
  });

  it('can be clamped on all', function() {
    vector.set({ x: 75, y: 10 });
    var clamped = vector.clamp({
      all: [0, 5]
    });

    expect(clamped.x).to.be.equal(5);
    expect(clamped.y).to.be.equal(5);
  });

  it('can be rotated', function() {
    vector.set({ x: 20, y: 30 });
    vector.rotate(1);

    expect(vector.x).to.be.within(19.4, 19.5);
    expect(vector.y).to.be.within(30.3, 30.4);
  });

  it('can be rotated by degrees', function() {
    vector.set({ x: 20, y: 20 });
    vector.rotate(45, {
      degrees: true
    });

    expect(vector.x).to.be.within(19.9, 20.0);
    expect(vector.y).to.be.within(20.0, 20.1);
  });

  it('can lerp', function() {
    vector.set({ x: 50, y: 65 });
    var other = new Vector2(100, -65);

    vector.lerp(other, 0.5);

    expect(vector.x).to.be.equal(75);
    expect(vector.y).to.be.equal(0);
  });
});
