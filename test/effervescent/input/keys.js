describe("Keys", function() {
  var Keys = requireFromSrc("effervescent/input/keys");
  var window = null;
  var event = null;

  beforeEach(function() {
    window = {
      addEventListener: sinon.spy(),
      removeEventListener: sinon.spy()
    };

    event = {
      keyCode: 13
    };
  });

  it("has a map", function() {
    expect(Keys.map).to.be.an('array');
  });

  it("can listen for key events", function() {
    Keys.listen(window);

    expect(window.addEventListener).to.have.been.calledWith("keydown", Keys.onKeyDown);
    expect(window.addEventListener).to.have.been.calledWith("keyup", Keys.onKeyUp);
  });

  it("can stop listening for key events", function() {
    Keys.listen(window);
    Keys.stopListening(window);

    expect(window.removeEventListener).to.have.been.calledWith("keydown", Keys.onKeyDown);
    expect(window.removeEventListener).to.have.been.calledWith("keyup", Keys.onKeyUp);
  });

  it("has an onKeyUp handler", function() {
    Keys.pressed.push("Enter");
    Keys.onKeyUp(event);

    expect(Keys.released).to.include("Enter");
    expect(Keys.pressed).to.not.include("Enter");
  });

  it("has an onKeyDown handler", function() {
    Keys.onKeyDown(event);

    expect(Keys.pressed).to.include("Enter");
  });

  it("isPressed returns true if a key pressed", function() {
    Keys.onKeyDown(event);

    expect(Keys.isPressed("Enter")).to.be.true;
  });

  it("isPressed returns false if a key is not pressed", function() {
    Keys.onKeyDown(event);

    expect(Keys.isPressed("A")).to.be.false;
  });

  it("isReleased returns true if a key was released", function() {
    Keys.onKeyUp(event);

    expect(Keys.isReleased("Enter")).to.be.true;
  });

  it("isReleased returns false if a key was not released", function() {
    Keys.onKeyUp(event);

    expect(Keys.isReleased("A")).to.be.false;
  });
});
