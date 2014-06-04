describe "Body", ->
  p2 = require "p2"
  Body = requireFromSrc "effervescent/physics/body"
  body = null

  beforeEach ->
    body = new Body()

  it "has a P2 rectangular body by default", ->
    expect(body.body).to.be.an.instanceOf p2.Body
    expect(body.body.shapes[0]).to.be.an.instanceOf p2.Rectangle

  it "can have a circular body", ->
    body = new Body(shape: "circle", radius: 20)
    expect(body.body).to.be.an.instanceOf p2.Body
    expect(body.body.shapes[0]).to.be.an.instanceOf p2.Circle

  it "can have a capsular body", ->
    body = new Body(shape: "capsule", length: 100, radius: 20)
    expect(body.body).to.be.an.instanceOf p2.Body
    expect(body.body.shapes[0]).to.be.an.instanceOf p2.Capsule
