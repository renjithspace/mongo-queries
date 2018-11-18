const express = require('express')
const socket = require('./socket')
const queries = require('./queries')

socket.connect.then(socket => {
  socket.on('query', data => {
    queries[data]
  })
})