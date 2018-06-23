/* eslint-disable no-console */
import { MongoClient } from 'mongodb';

const insertDocuments = collection => collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
const findDocuments = collection => collection.find({}).toArray();

const URI = 'mongodb://kotetsu:qv4zvvcbfV3XeAxw@cluster0-shard-00-00-spwtd.mongodb.net:27017,'
  + 'cluster0-shard-00-01-spwtd.mongodb.net:27017,cluster0-shard-00-02-spwtd.mongodb.net:27017/test?'
  + 'ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

MongoClient.connect(URI).then((client) => {
  const db = client.db('wildTigerDb');
  console.info('Connected to database.');
  const collection = db.collection('wildTigerCollection');
  insertDocuments(collection).then(() => {
    console.info('Inserted documents into the collection.');
    findDocuments(collection).then((docs) => {
      console.info('Found the following records:');
      console.info(docs);
      collection.drop().then(() => {
        console.info('Dropped collection.');
        const force = false;
        client.close(force).then(() => {
          console.info('Closed connection to database.');
        }).catch(error => console.error(error));
      });
    }).catch(error => console.error(error));
  }).catch(error => console.error(error));
}).catch(error => console.error(error));
