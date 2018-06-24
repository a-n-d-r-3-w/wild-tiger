/* eslint-disable no-console */
import 'babel-polyfill';
import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';

const mongoDbConfig = JSON.parse(readFileSync('./mongoDb.json', 'utf-8'));
const URI = `mongodb://${mongoDbConfig.username}:${mongoDbConfig.password}@cluster0-shard-00-00-spwtd.mongodb.net:27017,`
  + 'cluster0-shard-00-01-spwtd.mongodb.net:27017,cluster0-shard-00-02-spwtd.mongodb.net:27017/test?'
  + 'ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const insertDocuments = collection => collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
const findDocuments = collection => collection.find({}).toArray();

MongoClient.connect(URI).then(async (client) => {
  const db = client.db('wildTigerDb');
  console.info('Connected to database.');
  const collection = db.collection('wildTigerCollection');
  await insertDocuments(collection);
  console.info('Inserted documents into the collection.');
  const docs = await findDocuments(collection);
  console.info('Found the following records:');
  console.info(docs);
  await collection.drop();
  console.info('Dropped collection.');
  const force = false;
  await client.close(force);
  console.info('Closed connection to database.');
}).catch(error => console.error(error));
