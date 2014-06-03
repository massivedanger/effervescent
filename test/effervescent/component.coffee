describe "Component", ->
  Component = requireFromSrc "effervescent/component"
  component = null

  beforeEach ->
    component = new Component()

  it "has a name", ->
    expect(component.name).to.be.a 'string'
