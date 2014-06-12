describe("Family", function() {
  var Entity = requireFromSrc("effervescent/entity");
  var Component = requireFromSrc("effervescent/component");
  var Family = requireFromSrc("effervescent/family");

  var entity = null;
  var component = null;
  var family = null;

  beforeEach(function() {
    entity = new Entity();
    family = new Family(["test"]);

    component = new Component();
    component.name = "test";

    entity.addComponent(component);
  });

  it("can add an entity, if it matches", function() {
    family.addEntityIfMatches(entity);

    expect(family.entities.length).to.equal(1);
  });

  it("does not add an entity if it is not a match", function() {
    entity.removeComponent("test");
    family.addEntityIfMatches(entity);

    expect(family.entities.length).to.equal(0);
  });

  it("can remove an entity", function() {
    family.addEntityIfMatches(entity);
    expect(family.entities.length).to.equal(1);
    family.removeEntity(entity);

    expect(family.entities.length).to.equal(0);
  });

  it("adds an entity with a callback", function() {
    family.entityComponentAdded({ entity: entity, componentName: component.name });

    expect(family.entities.length).to.equal(1);
  });

  it("does not add an entity with a callback if it is not a match", function() {
    var newEntity = new Entity();
    expect(family.entities.length).to.equal(1);
    family.entityComponentAdded({ entity: newEntity, componentName: "not.a.member" });

    expect(family.entities.length).to.equal(1);
  });

  it("removes an entity with a callback", function() {
    family.addEntityIfMatches(entity);
    expect(family.entities.length).to.equal(1);
    family.entityComponentRemoved({ entity: entity, componentName: component.name });

    expect(family.entities.length).to.equal(0);
  });

  it("does not remove an entity with a callback if it is not a match", function() {
    family.addEntityIfMatches(entity);
    expect(family.entities.length).to.equal(1);
    family.entityComponentRemoved({ entity: entity, componentName: "another.test" });

    expect(family.entities.length).to.equal(1);
  });
});
