class Player
  os = require "os"
  path = require "path"
  resourcesPath = if process.resourcesPath
    # We are a packaged atom-shell app
    path.join(process.resourcesPath, "app")
  else
    process.cwd()

  @gameName: try
    require(path.join resourcesPath, "game.json")?.name || "Effervescent Game"
  catch
    "Effervescent Game"

  @filePath: (file = "") ->
    platformSpecific = switch os.platform()
      when "darwin" then "/Library/Application Support/#{@gameName}"
      when "linux" then ".config/#{slugify @gameName}"
      when "win32" then "/AppData/#{@gameName}"

    path.join homeDirectory, platformSpecific, file

  homeDirectory = process.env.HOME ||
    process.env.HOMEPATH ||
    process.env.USERPROFILE

  slugify = (text, seperator = '_') ->
    text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/\s+/g, seperator)

module.exports = Player
