const express = require('express')
const socket = require('socket.io')
const config = require('./config')
const queries = require('./queries')

const app = express()
const server = app.listen(config.socket.port, config.socket.host)

const io = socket(server)

io.on('connection', socket => {
  socket.on('query', data => {
    queries[data]
  })
})