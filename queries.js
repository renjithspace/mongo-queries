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

function result(error, response) {
  const result = error ? error : response
  io.emit('result', result)
  collect()
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
    books.insertOne(book, (err, res) => result(err, res))
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
    booksCollection.insertMany(books, (err, res) => result(err, res))
  })
}

function updateOne() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.updateOne(
      { price: 176 },
      {$set: { price: 150 }},
      (err, res) => result(err, res)
    )
  })
}

function updateMany() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.updateMany(
      { price: 350 },
      {$set: { price: 340 }},
      (err, res) => result(err, res)
    )
  })
}

module.exports = {
  collect,
  insertOne,
  insertMany,
  updateOne,
  updateMany
}