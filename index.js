var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://kotetsu:qv4zvvcbfV3XeAxw@cluster0-shard-00-00-spwtd.mongodb.net:27017,cluster0-shard-00-01-spwtd.mongodb.net:27017,cluster0-shard-00-02-spwtd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect(uri, function(err, db) {
  // Paste the following examples here

  db.close();
});