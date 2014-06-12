describe("Entity", function() {
  var Entity = requireFromSrc("effervescent/entity");
  var Component = requireFromSrc("effervescent/component");

  var postal = require("postal");

  var entity = null;
  var component = null;

  beforeEach(function() {
    entity = new Entity();
    component = new Component();
    return component.name = "testing";
  });

  it("can add components", function() {
    var oldPublish = postal.publish;
    postal.publish  = sinon.spy();
    entity.addComponent(component);

    expect(postal.publish).to.have.been.calledWith({
      channel: "entities",
      topic: "component.add",
      data: {
        entity: entity,
        componentName: component.name
      }
    });
    postal.publish = oldPublish;
  });

  it("can add multiple components", function() {
    var components = [];
    for (i = _i = 1; _i <= 5; i = ++_i) {
      var newComponent = new Component();
      newComponent.name = "testing-" + i;
      components.push(newComponent);
    }

    entity.addComponents(components);

    for (i = _j = 1; _j <= 5; i = ++_j) {
      expect(entity.hasComponent("testing-" + i)).to.be.true;
    }
  });

  it("can check for components", function() {
    entity.addComponent(component);
    return expect(entity.hasComponent("testing")).to.be.true;
  });

  it("can remove components", function() {
    var oldPublish = postal.publish;
    entity.addComponent(component);
    postal.publish = sinon.spy();
    entity.removeComponent("testing");

    expect(postal.publish).to.have.been.calledWith({
      channel: "entities",
      topic: "component.remove",
      data: {
        entity: entity,
        componentName: component.name
      }
    });
    postal.publish = oldPublish;
  });

  it("can get components", function() {
    entity.addComponent(component);
    return expect(entity.getComponent(component.name)).to.be.equal(component);
  });
  it("has a callback when it's added to a state", function() {
    entity.addedToState("state");
    return expect(entity.state).to.be.equal("state");
  });
  return it("has a callback when it's removed from a state", function() {
    entity.state = "state";
    entity.removedFromState("state");
    return expect(entity.state).to.be.null;
  });
});
