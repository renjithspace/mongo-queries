import Prism from 'prismjs'
import $ from 'jquery'
const io = require('socket.io-client')
const config = require('../config')

const socket = io(`http://${config.socket.host}:${config.socket.port}`)

function queriesEmitterInit() {
  $('.query').click(function() {
    const query = $(this).attr('data-query')
    socket.emit('query', query)
  })
}

function listenToResult() {
  socket.on('result', result => {
    const resultFormatted = JSON.stringify(result, null, 2)
    const resultHighlighted = Prism.highlight(resultFormatted, Prism.languages.javascript)
    $('#result').html(resultHighlighted)
  })
}

function listenToCollection() {
  socket.on('collection', collection => {
    const collectionFormatted = JSON.stringify(collection, null, 2)
    const collectionHighlighted = Prism.highlight(collectionFormatted, Prism.languages.javascript)
    $('#collection').html(collectionHighlighted)
  })
}

$(function() {
  queriesEmitterInit()
  listenToResult()
  listenToCollection()
})

socket.emit('query', 'collect')