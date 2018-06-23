/* eslint-disable no-console */
const { MongoClient } = require('mongodb');

const insertDocuments = (db, callback) => {
  const collection = db.collection('documents');
  collection.insertMany([
    { a: 1 }, { a: 2 }, { a: 3 },
  ], (err, result) => {
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });
};

const findDocuments = (db, callback) => {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray((err, docs) => {
    console.log('Found the following records');
    console.log(docs);
    callback(docs);
  });
};

const uri = 'mongodb://kotetsu:qv4zvvcbfV3XeAxw@cluster0-shard-00-00-spwtd.mongodb.net:27017,cluster0-shard-00-01-spwtd.mongodb.net:27017,cluster0-shard-00-02-spwtd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
MongoClient.connect(uri, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  const db = client.db('test');
  console.info('Connected to database with no error.');
  insertDocuments(db, () => {
    findDocuments(db, () => {
      const collection = db.collection('documents');
      collection.drop().then(() => {
        client.close();
      });
    });
  });
});
