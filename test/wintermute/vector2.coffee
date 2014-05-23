describe "Vector2", ->
  Vector2 = require "../../src/wintermute/vector2"

  vector = null

  beforeEach ->
    vector = new Vector2()

  it "has a zero x and y by default", ->
    expect(vector.x).to.be.equal(0)
    expect(vector.y).to.be.equal(0)

  it "can set both coordinates", ->
    vector.set 20, 30

    expect(vector.x).to.be.equal(20)
    expect(vector.y).to.be.equal(30)

  it "can be cloned!", ->
    vector.set 33, 99
    newVector = vector.clone()

    expect(newVector.x).to.be.equal(33)
    expect(newVector.y).to.be.equal(99)

  it "can be checked for equality", ->
    newVector = vector.clone()

    expect(newVector.equal(vector)).to.be.true

  it "can copy coordinates from another", ->
    newVector = new Vector2(66, 99)

    expect(newVector.x).to.be.equal(66)
    expect(newVector.y).to.be.equal(99)

    newVector.copyFrom vector

    expect(newVector.x).to.be.equal(0)
    expect(newVector.y).to.be.equal(0)

  it "can add", ->
    vector.set 20, 30
    vector.add 20, 30

    expect(vector.x).to.be.equal(40)
    expect(vector.y).to.be.equal(60)

  it "can add", ->
    vector.set 20, 30
    vector.subtract 10, 15

    expect(vector.x).to.be.equal(10)
    expect(vector.y).to.be.equal(15)

  it "can multiply", ->
    vector.set 20, 30
    vector.multiply 2, 3

    expect(vector.x).to.be.equal(40)
    expect(vector.y).to.be.equal(90)

  it "can divide", ->
    vector.set 20, 30
    vector.divide 2, 3

    expect(vector.x).to.be.equal(10)
    expect(vector.y).to.be.equal(10)

  it "has a magnitude", ->
    vector.set 20, 30

    expect(vector.magnitude()).to.be.equal(36.05551275463989)

  it "has an angle", ->
    vector.set 20, 20
    expect(vector.angle()).to.be.equal(0.7853981633974483)

  it "has an angle in degrees", ->
    vector.set 20, 20
    expect(vector.angle(degrees: true)).to.be.equal(44.99999998972517)

  it "get an angle to another vector in radians", ->
    other = new Vector2(99, 300)
    expect(vector.angleTo(other)).to.equal(-1.889543887215541)

  it "get an angle to another vector in degrees", ->
    other = new Vector2(99, 300)
    radians = vector.angleTo(other)
    expect(vector.angleTo(other, degrees: true))
      .to.equal(radians * Vector2.radiansToDegrees)

  it "can get a cross product", ->
    other = new Vector2(30, 15)
    vector.set 10, -90

    expect(vector.cross(other)).to.be.equal(2850)

  it "can get a dot product", ->
    other = new Vector2(99, 40)
    vector.set 11, 32

    expect(vector.dot(other)).to.be.equal(2369)

  it "can be clamped", ->
    vector.set 75, 10
    clamped = vector.clamp(x: [0, 100], y: [0, 5])

    expect(clamped.x).to.be.equal(75)
    expect(clamped.y).to.be.equal(5)

  it "can be clamped only on X", ->
    vector.set 75, 10
    clamped = vector.clamp(x: [0, 100])

    expect(clamped.x).to.be.equal(75)
    expect(clamped.y).to.be.equal(10)

  it "can be clamped only on Y", ->
    vector.set 75, 10
    clamped = vector.clamp(y: [0, 1])

    expect(clamped.x).to.be.equal(75)
    expect(clamped.y).to.be.equal(1)

  it "can be clamped on all", ->
    vector.set 75, 10
    clamped = vector.clamp(all: [0, 5])

    expect(clamped.x).to.be.equal(5)
    expect(clamped.y).to.be.equal(5)

  it "can be rotated", ->
    vector.set 20, 30
    vector.rotate 1

    expect(vector.x).to.be.equal(19.48087668059005)
    expect(vector.y).to.be.equal(30.339667825400497)

  it "can be rotated by degrees", ->
    vector.set 20, 20
    vector.rotate 45, degrees: true

    expect(vector.x).to.be.equal(19.999999996413404)
    expect(vector.y).to.be.equal(20.000000003586596)
