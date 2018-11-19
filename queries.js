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

function insertMany() {
  mongodb.connect.then(db => {
    const books = [
      {
        title: 'Sita - Warrior of Mithila',
        author: 'Amish',
        price: 350,
        available: true,
        created: new Date()
      },
      {
        title: 'The Girl in Room 105',
        author: 'Chetan Bhagat',
        price: 199,
        available: false,
        created: new Date()
      }
    ]
    
    var booksCollection = db.collection('books')
    booksCollection.insertMany(books, (error, response) => {
      const result = error ? error : response
      io.emit('result', result)
      collect()
    })
  })
}

function updateOne() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.updateOne({ price: 176 }, {$set: { price: 150 }}, (error, response) => {
      const result = error ? error : response
      io.emit('result', result)
      collect()
    })
  })
}

module.exports = {
  collect,
  insertOne,
  insertMany,
  updateOne
}