class System
  constructor: ->
    @world = null

  update: (delta) ->
    throw new Error('Override #update')

module.exports = System
