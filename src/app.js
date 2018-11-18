import Prism from 'prismjs'
const io = require('socket.io-client')
const config = require('../config')

const socket = io(`http://${config.socket.host}:${config.socket.port}`)

function emitQueries() {
  const queryDOMs = document.querySelectorAll('.query')
  
  queryDOMs.forEach(queryDOM => {
    queryDOM.addEventListener('click', () => {
      const query = queryDOM.getAttribute('data-query')
      socket.emit(query)
    })
  })
}

emitQueries()