class System
  constructor: ->
    @state = null

  update: (delta) ->
    throw new Error('Override #update')

module.exports = System
