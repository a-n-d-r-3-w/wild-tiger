var MongoClient = require('mongodb').MongoClient;

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    // assert.equal(err, null);
    // assert.equal(3, result.result.n);
    // assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    // assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var uri = "mongodb://kotetsu:qv4zvvcbfV3XeAxw@cluster0-shard-00-00-spwtd.mongodb.net:27017,cluster0-shard-00-01-spwtd.mongodb.net:27017,cluster0-shard-00-02-spwtd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect(uri, function(err, client) {
  if (err) {
    console.error(err);
    return;
  }
  let db = client.db('test');
  console.info('Connected to database with no error.');
  insertDocuments(db, function() {
    findDocuments(db, function() {
      client.close();
    });
  });
});