describe "Entity", ->
  Entity = requireFromSrc "effervescent/entity"
  Component = requireFromSrc "effervescent/component"
  entity = null
  component = null

  beforeEach ->
    entity = new Entity()
    component = new Component()
    component.name = "testing"

  it "can add components", ->
    entity.onComponentAdded.emit = sinon.spy()
    entity.addComponent component

    expect(entity.onComponentAdded.emit).to.have.been.calledWith(
      entity,
      component.name
    )

  it "can check for components", ->
    entity.addComponent component
    expect(entity.hasComponent("testing")).to.be.true

  it "can remove components", ->
    entity.addComponent component
    entity.onComponentRemoved.emit = sinon.spy()
    entity.removeComponent "testing"

    expect(entity.onComponentRemoved.emit).to.have.been.calledWith(
      entity,
      component.name
    )

  it "can get components", ->
    entity.addComponent component
    expect(entity.getComponent component.name).to.be.equal(component)

  it "has a callback when it's added to a state", ->
    entity.addedToState "state"
    expect(entity.state).to.be.equal "state"

  it "has a callback when it's removed from a state", ->
    entity.state = "state"
    entity.removedFromState "state"

    expect(entity.state).to.be.null
