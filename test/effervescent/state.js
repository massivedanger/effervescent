describe("State", function() {
  var State = requireFromSrc("effervescent/state");
  var Entity = requireFromSrc("effervescent/entity");
  var Component = requireFromSrc("effervescent/component");
  var System = requireFromSrc("effervescent/system");

  var state = null;
  var entity = null;
  var component = null;
  var system = null;

  beforeEach(function() {
    state = new State();
    entity = new Entity();
    system = new System();

    component = new Component();
    component.name = "test";
  });

  it("can add an entity", function() {
    entity.addedToState = sinon.spy();
    entity.addComponent(component);
    state.addEntity(entity);

    expect(state.getEntities(["test"])).to.include(entity);
    expect(entity.addedToState).to.have.been.calledWith(state);
  });

  it("can remove an entity", function() {
    entity.removedFromState = sinon.spy();
    entity.addComponent(component);
    state.addEntity(entity);

    expect(state.getEntities(["test"])).to.include(entity);
    state.removeEntity(entity);

    expect(state.getEntities(["test"])).to.not.include(entity);
    expect(entity.removedFromState).to.have.been.calledWith(state);
  });

  it("can add entities to families", function() {
    state.addEntity(entity);

    expect(state.getEntities(["test"])).to.not.include(entity);
    entity.addComponent(component);

    expect(state.getEntities(["test"])).to.include(entity);
  });

  it("can remove entities from families", function() {
    state.addEntity(entity);
    entity.addComponent(component);

    expect(state.getEntities(["test"])).to.include(entity);
    state.removeEntity(entity);

    expect(state.getEntities(["test"])).to.not.include(entity);
  });

  it("can get entities", function() {
    entity.addComponent(component);
    state.addEntity(entity);

    expect(state.getEntities(["test"])).to.include(entity);
  });

  it("can add a system", function() {
    expect(system.state).to.be["null"];
    state.addSystem(system);

    expect(system.state).to.be.equal(state);
    system.update = sinon.spy();
    state.update(1.0);

    expect(system.update).to.have.callCount(1);
  });

  it("can remove a system", function() {
    state.addSystem(system);
    state.removeSystem(system);
    system.update = sinon.spy();
    state.update(1.0);

    expect(system.update).to.have.callCount(0);
    expect(system.state).to.be.equal(null);
  });

  it("can update", function() {
    state.addSystem(system);
    system.update = sinon.spy();
    state.update(1.0);

    expect(system.update).to.have.callCount(1);
  });
});
