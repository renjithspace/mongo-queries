const mongodb = require('mongodb')
const config = require('../config')

const MongoClient = mongodb.MongoClient

const connect = new Promise((resolve, reject) => {
  MongoClient.connect(config.mongodb_uri, { useNewUrlParser: true }, (error, client) => {
    if (error) reject()

    const db = client.db('library')
    resolve(db)
  })
})

module.exports = connect
