describe("Component", function() {
  var Component = requireFromSrc("effervescent/component");
  var component = null;

  beforeEach(function() {
    component = new Component();
  });

  it("has a name", function() {
    return expect(component.name).to.be.a('string');
  });

  it("has an addedToState callback", function() {
    return expect(component).to.respondTo('addedToState');
  });

  it("has an removedFromState callback", function() {
    return expect(component).to.respondTo('removedFromState');
  });
});
