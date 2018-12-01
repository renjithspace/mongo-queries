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

function insertDocument() {
  mongodb.connect.then(db => {
    const book = {
      title: 'One Indian Girl',
      author: 'Chetan Bhagat',
      price: 176,
      available: true,
      created: new Date()
    }
    
    var booksCollection = db.collection('books')
    booksCollection.insert(book, (err, res) => result(err, res))
  })
}

function insertArrayOfDocuments() {
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
    booksCollection.insert(books, (err, res) => result(err, res))
  })
}

function insertWithId() {
  mongodb.connect.then(db => {
    const book = {
      _id: 1,
      title: 'One Indian Girl',
      author: 'Chetan Bhagat',
      price: 176,
      available: true,
      created: new Date()
    }
    
    var booksCollection = db.collection('books')
    booksCollection.insert(book, (err, res) => result(err, res))
  })
}

function findOne() {
  mongodb.connect.then(db => {
    const query = { author: 'Amish' }
    db.collection('books')
      .findOne(query, (err, res) => result(err, res))
  })
}

function findOneAndDelete() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.findOneAndDelete({ author: 'Amish' }, (err, res) => result(err, res))
  })
}

function findOneAndReplace() {
  mongodb.connect.then(db => {
    const filter = { price: 176 }
    const book = {
      title: 'One Indian Girl',
      author: 'Chetan Bhagat',
      price: 200,
      available: false,
      created: new Date()
    }
    var books = db.collection('books')
    books.findOneAndReplace(filter, book, (err, res) => result(err, res))
  })
}

function findOneAndUpdate() {
  mongodb.connect.then(db => {
    const filter = { price: 176 }
    const update = { $inc: { price: 14 } }
    var books = db.collection('books')
    books.findOneAndUpdate(filter, update, (err, res) => result(err, res))
  })
}

function findOneAndUpdateWithProjection() {
  mongodb.connect.then(db => {
    const filter = { price: 176 }
    const update = { $inc: { price: 14 } }
    const projection = { _id: false, title: true, author: true }
    var books = db.collection('books')
    books.findOneAndUpdate(filter, update, { projection }, (err, res) => result(err, res))
  })
}

function findOneAndUpdateWithSort() {
  mongodb.connect.then(db => {
    const filter = { available: true }
    const update = { $inc: { price: 14 } }
    const sort = { title: 1 }
    var books = db.collection('books')
    books.findOneAndUpdate(filter, update, { sort }, (err, res) => result(err, res))
  })
}

function findOneAndUpdateWithUpsert() {
  mongodb.connect.then(db => {
    const filter = { price: 176 }
    const update = { $inc: { price: 14 } }
    var books = db.collection('books')
    books.findOneAndUpdate(filter, update, { upsert: true }, (err, res) => result(err, res))
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
      .find()
      .project({ _id: false, created: false })
      .toArray((err, res) => result(err, res))
  })
}

function findWithIncludeFields() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find()
      .project({ title: true, author: true })
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

function findWithSort() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find()
      .sort({ price: 1 })
      .toArray((err, res) => result(err, res))
  })
}

function findWithLimit() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find()
      .limit(5)
      .toArray((err, res) => result(err, res))
  })
}

function findWithSortAndLimit() {
  mongodb.connect.then(db => {
    db.collection('books')
      .find()
      .sort({ price: -1 })
      .limit(5)
      .toArray((err, res) => result(err, res))
  })
}

function updateDocument() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.update(
      { price: 176 },
      {$set: { price: 150 }},
      (err, res) => result(err, res)
    )
  })
}

function updateMultipleDocuments() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.update(
      { price: 176 },
      {$set: { price: 150 }},
      { multi: true },
      (err, res) => result(err, res)
    )
  })
}

function updateWithUpsert() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.update(
      { price: 176 },
      {$set: { price: 150 }},
      { upsert: true },
      (err, res) => result(err, res)
    )
  })
}

function updateWithIncrement() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.update(
      { price: 176 },
      {$inc: { price: 100 }},
      (err, res) => result(err, res)
    )
  })
}

function updateWithMultiplies() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.update(
      { price: 176 },
      {$mul: { price: 2 }},
      (err, res) => result(err, res)
    )
  })
}

function updateWithUnset() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.update(
      { price: 176 },
      {$unset: { price: '' }},
      (err, res) => result(err, res)
    )
  })
}

function updateWithRename() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.update(
      { price: 176 },
      {$rename: { price: 'amount' }},
      (err, res) => result(err, res)
    )
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

function updateOneWithUpsert() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.updateOne(
      { price: 176 },
      {$set: { price: 150 }},
      { upsert: true },
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

function updateManyWithUpsert() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.updateMany(
      { price: 350 },
      {$set: { price: 340 }},
      { upsert: true },
      (err, res) => result(err, res)
    )
  })
}

function deleteOne() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.deleteOne({ available: true }, (err, res) => result(err, res))
  })
}

function deleteMany() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.deleteMany({ available: false }, (err, res) => result(err, res))
  })
}

function replaceOne() {
  mongodb.connect.then(db => {
    const filter = { title: 'One Indian Girl' }
    const book = {
      title: 'One Indian Girl - New Edition',
      author: 'Chetan Bhagat',
      price: 182,
      available: false,
      created: new Date()
    }

    var books = db.collection('books')
    books.replaceOne(filter, book, (err, res) => result(err, res))
  })
}

function countAllDocumentsInCollection() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.estimatedDocumentCount((err, res) => result(err, res))
  })
}

function countDocuments() {
  mongodb.connect.then(db => {
    var books = db.collection('books')
    books.countDocuments({ available: true }, (err, res) => result(err, res))
  })
}

module.exports = {
  collect,
  insertOne,
  insertMany,
  insertDocument,
  insertArrayOfDocuments,
  insertWithId,
  findOne,
  findOneAndDelete,
  findOneAndReplace,
  findOneAndUpdate,
  findOneAndUpdateWithProjection,
  findOneAndUpdateWithSort,
  findOneAndUpdateWithUpsert,
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
  findWithSort,
  findWithLimit,
  findWithSortAndLimit,
  updateDocument,
  updateMultipleDocuments,
  updateWithUpsert,
  updateWithIncrement,
  updateWithMultiplies,
  updateWithUnset,
  updateWithRename,
  updateOne,
  updateOneWithUpsert,
  updateMany,
  updateManyWithUpsert,
  deleteOne,
  deleteMany,
  replaceOne,
  countAllDocumentsInCollection,
  countDocuments
}