const mongodb = require('../mongodb')

module.exports = () => {
  mongodb.connect.then(db => {
    const book = {
      title: 'One Indian Girl',
      author: 'Chetan Bhagat',
      price: 176,
      available: true,
      created: new Date()
    }
    
    var books = db.collection('books')
    books.insertOne(book)
  })
}