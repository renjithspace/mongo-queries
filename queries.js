const mongodb = require('./mongodb')
const io = require('./socket')

function collect() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find()
      .toArray()
      .then(books => io.emit('collection', books))
  })
}

function insertOne() {
  mongodb.connect.then(db => {
    const book = {
      title: 'One Indian Girl',
      author: 'Chetan Bhagat',
      price: 176,
      available: true,
      created: new Date()
    }
    
    var books = db.collection('books')
    books.insertOne(book, (error, response) => {
      const result = error ? error : response
      io.emit('result', result)
      collect()
    })
  })
}

module.exports = {
  insertOne,
  collect
}