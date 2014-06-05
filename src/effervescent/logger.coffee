winston = require "winston"
Player = require "./player"

logger = new winston.Logger
  transports: [
    new winston.transports.Console(),
    new winston.transports.File(filename: Player.filePath('game.log'))
  ]

module.exports = logger
