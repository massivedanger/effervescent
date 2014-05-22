describe "Sprite", ->
  Sprite = require "../../src/wintermute/sprite"

  sprite = null

  beforeEach ->
    sprite = new Sprite()

  it "has an image", ->
    newSprite = new Sprite(image: 'image')

    expect(newSprite.image).to.equal('image')
