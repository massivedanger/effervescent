describe "Component", ->
  Component = requireFromSrc "effervescent/component"
  component = null

  beforeEach ->
    component = new Component()

  it "has a name", ->
    expect(component.name).to.be.a 'string'

  it "has an addedToState callback", ->
    expect(component).to.respondTo 'addedToState'

  it "has an removedFromState callback", ->
    expect(component).to.respondTo 'removedFromState'
