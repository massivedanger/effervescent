describe('System', function() {
  var System = requireFromSrc('effervescent/system');

  var system = null;

  beforeEach(function() {
    system = new System();
  });

  it('has a blank state by default', function() {
    expect(system.state).to.be.equal(null);
  });

  it('throws an error when updating by default', function() {
    expect(function() {
      system.update(0.01);
    }).to.throw(Error);
  });
});
