describe "Component", ->
  Component = require "../../src/wintermute/component"
  component = null

  beforeEach ->
    component = new Component()

  it "has a name", ->
    expect(component.name).to.be.a 'string'
