Player = require "./player"

class Preferences
  @createFromTemplate: (file, name, callback = null) ->
    destination = Player.filePath "#{name}.json"
    fs.copy file, destination, (err) ->
      console.error "Error creating preferences from template! #{err}"

    callback.call(new Preferences(name)) if callback

  constructor: (@name = 'preferences') ->
    @file = Player.filePath "#{@name}.json"
    fse.createFile @file, (err) ->
      unless err
        fse.readJson @file, (err, data) ->
          console.error(err) if err
          @data = data

  save: ->
    fse.outputJson @file, @data, (err) ->
      console.error(err) if err

  fse = require "fs-extra"

module.exports = Preferences
