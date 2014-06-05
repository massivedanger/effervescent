winston = require "winston"
Player = require "./player"

logger = new winston.Logger
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile(
      filename: Player.filePath('game.log'),
      datePattern: '.yyyy-MM-ddTHH'
    )
  ]

module.exports = logger
