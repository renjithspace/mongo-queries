import Prism from 'prismjs'
const io = require('socket.io-client')
const config = require('../config')

const socket = io(`http://${config.socket.host}:${config.socket.port}`)

function emitQueries() {
  const queryDOMs = document.querySelectorAll('.query')
  
  queryDOMs.forEach(queryDOM => {
    queryDOM.addEventListener('click', () => {
      const resultCodeDOM = document.querySelector('#result')
      resultCodeDOM.innerHTML = ''

      const query = queryDOM.getAttribute('data-query')
      socket.emit('query', query)
    })
  })
}

socket.on('result', result => {
  const resultCodeDOM = document.querySelector('#result')
  const resultCode = JSON.stringify(result, null, 2)
  resultCodeDOM.innerHTML = Prism.highlight(resultCode, Prism.languages.javascript)
  goToCollectionBottom()
})

socket.on('collection', collection => {
  const collectionCodeDOM = document.querySelector('#collection')
  const collectionCode = JSON.stringify(collection, null, 2)
  collectionCodeDOM.innerHTML = Prism.highlight(collectionCode, Prism.languages.javascript)
})

function goToCollectionBottom() {
  setTimeout(() => {
    const collectionWrapperDOM = document.querySelector('.collection .wrapper')
    collectionWrapperDOM.scrollTop = collectionWrapperDOM.scrollHeight
  }, 300)
}

emitQueries()
socket.emit('query', 'collect')