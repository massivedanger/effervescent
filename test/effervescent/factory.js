describe('Factory', function() {
  var Factory = requireFromSrc('effervescent/factory');
  var Entity = requireFromSrc('effervescent/entity');
  var Component = requireFromSrc('effervescent/component');

  var result = null;

  it('generates an Entity by default', function() {
    result = Factory.run();

    expect(result).to.be.an.instanceOf(Entity);
  });

  it('can take a different class for generation', function() {
    var ComponentFactory = Factory.extend({
      class: Component
    });

    result = ComponentFactory.run();

    expect(result).to.be.an.instanceOf(Component);
  });

  it('processes each object before returning it', function() {
    var ProcessFactory = Factory.extend({
      process: function(entity) {
        entity.processed = true;
        entity.processedAt = new Date();
      }
    });

    var result = ProcessFactory.run();

    expect(result.processed).to.be.true;
    expect(result.processedAt).to.be.an.instanceOf(Date);
  });
});
