describe('Game', function() {
  var Game = requireFromSrc('effervescent/game');
  var State = requireFromSrc('effervescent/state');
  var game = null;
  var state = null;

  beforeEach(function() {
    game = new Game();
    state = new State();

    game.update = function() {
      game.states.forEach(function(state) {
        state.update(game.deltaTime);
      });
      game.running = false;
    };
  });

  it('can push a state on its stack', function() {
    game.pushState(state);
    expect(game.getCurrentState()).to.be.equal(state);
  });

  it('can pop a state', function() {
    game.states = [state];
    game.popState();
    expect(game.states).to.be.empty;
  });

  it('can change states entirely', function() {
    var state2 = new State();
    var state3 = new State();

    game.pushState(state);
    game.pushState(state3);
    game.changeState(state2);

    expect(game.getCurrentState()).to.be.equal(state2);
    expect(game.states.length).to.be.equal(1);
  });

  it('can get the current state', function() {
    var state2 = new State();
    var state3 = new State();

    game.pushState(state3);
    game.pushState(state2);
    game.pushState(state);

    expect(game.getCurrentState()).to.be.equal(state);
  });

  it('can tick', function() {
    expect(game.deltaTime).to.be.equal(0);
  });

  it('updates all states', function() {
    game.pushState(state);
    state.update = sinon.spy();
    game.update();

    expect(state.update).to.have.been.calledWith(game.deltaTime);
  });
});
