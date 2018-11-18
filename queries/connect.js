const mongodb = require('mongodb')
const config = require('../config')

const MongoClient = mongodb.MongoClient
const db

MongoClient.connect(config.mongodb_uri, { useNewUrlParser: true }, (error, client) => {
  db = client.db('library')
  client.close()
})

module.exports = db
