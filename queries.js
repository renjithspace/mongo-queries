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

function insert() {
  mongodb.connect.then(db => {
    const book = {
      title: 'One Indian Girl',
      author: 'Chetan Bhagat',
      price: 176,
      available: true,
      created: new Date()
    }

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
    booksCollection.insert(book, (error, response) => {
      var result = error ? error : response

      booksCollection.insert(books, (error, response) => {
        result = [ result, error ? error : response ]
        io.emit('result', result)
        collect()
      })
    })
  })
}

function findOne() {
  mongodb.connect.then(db => {
    const query = { author: 'Amish' }
    db.collection('books')
      .findOne(query, (err, res) => result(err, res))
  })
}

function find() {
  mongodb.connect.then(db => {
    const query = { price: 350 }
    db.collection('books')
      .find(query)
      .toArray((err, res) => result(err, res))
  })
}

function findAll() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find()
      .toArray((err, res) => result(err, res))
  })
}

function findWithExcludeFields() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({}, { fields: { _id: false, created: false } })
      .toArray((err, res) => result(err, res))
  })
}

function findWithIncludeFields() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({}, { fields: { title: true, author: true } })
      .toArray((err, res) => result(err, res))
  })
}

function findWithEqual() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $eq: 199 }})
      .toArray((err, res) => result(err, res))
  })
}

function findWithNotEqual() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $ne: 199 }})
      .toArray((err, res) => result(err, res))
  })
}

function findWithGreaterThan() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $gt: 199 }})
      .toArray((err, res) => result(err, res))
  })
}

function findWithGreaterThanOrEqual() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $gte: 199 }})
      .toArray((err, res) => result(err, res))
  })
}

function findWithLessThan() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $lt: 199 }})
      .toArray((err, res) => result(err, res))
  })
}

function findWithLessThanOrEqual() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $lte: 199 }})
      .toArray((err, res) => result(err, res))
  })
}

function findWithMatchesAnyValues() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $in: [199, 350] }})
      .toArray((err, res) => result(err, res))
  })
}

function findWithMatchesNoneValues() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $nin: [199, 350] }})
      .toArray((err, res) => result(err, res))
  })
}

function findWithRanges() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find({ price: { $gt: 100, $lt: 200 }})
      .toArray((err, res) => result(err, res))
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
  insert,
  findOne,
  find,
  findAll,
  findWithExcludeFields,
  findWithIncludeFields,
  findWithEqual,
  findWithNotEqual,
  findWithGreaterThan,
  findWithGreaterThanOrEqual,
  findWithLessThan,
  findWithLessThanOrEqual,
  findWithMatchesAnyValues,
  findWithMatchesNoneValues,
  findWithRanges,
  updateOne,
  updateMany
}