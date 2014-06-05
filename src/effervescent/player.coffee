class Player
  @gameName = "Effervescent Game"

  @filePath: (file = "") ->
    platformSpecific = switch os.platform()
      when "darwin" then "/Library/Application Support/#{@gameName}"
      when "linux" then ".config/#{slugify @gameName}"
      when "win32" then "/AppData/#{@gameName}"

    path.join homeDirectory, platformSpecific, file

  homeDirectory = process.env.HOME ||
    process.env.HOMEPATH ||
    process.env.USERPROFILE

  os = require "os"
  path = require "path"

  slugify = (text, seperator = '_') ->
    text.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/\s+/g, seperator)

module.exports = Player
