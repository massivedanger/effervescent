describe('Base', function() {
  var Base = requireFromSrc('effervescent/base');
  var base = null;

  beforeEach(function() {
    Test = Base.extend({});
  });

  it('can be extended from an extension', function() {
    var TestAgain = Test.extend({
      ok: 'Yep'
    });

    var instance = new TestAgain();
    expect(instance.ok).to.be.equal('Yep');
  });
});
