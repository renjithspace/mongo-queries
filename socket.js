const express = require('express')
const socket = require('socket.io')
const config = require('./config')

const app = express()
const server = app.listen(config.socket.port, config.socket.host)

const io = socket(server)

const connect = new Promise((resolve, reject) => {
  io.on('connection', socket => resolve(socket))
})

module.exports = { connect }