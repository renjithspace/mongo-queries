const express = require('express')
const io = require('./socket')
const queries = require('./queries')

io.on('connection', socket => {
  socket.on('query', data => {
    queries[data]()
  })
})