const express = require('express')
const app = express()

//PUERTO A UTILIZAR PARA SERVER
const port = 3000

//EJS
let ejs = require('ejs');
app.use(express.static('./'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views',__dirname+'/');




var router = express.Router();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('2'));

var path = __dirname + '/';

var customers = [];

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.post("/index.html", function(req,res){
  console.log('Post a Customer: ' + JSON.stringify(req.body));
  var customer = {};
  customer.firstname = req.body.firstname;
  customer.lastname = req.body.lastname;
  
  customers.push(customer);
  
  return res.send(customer);
});

app.get("/index.html", function(req,res){
  console.log("pico");
  return res.send(customers);
});








































/*

//ROUTES
app.get('/', (req, res) => {
res.render('index.html')

})
*/


//JQUERY

/*
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
*/



//ESCUCHA PUERTO
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

 

//MONGO DB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');




const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

 insertDocuments(db, function() {
  findDocuments(db, function() {
    client.close();
  });
 });
});


//FUNCION INSERTAR DOCUMENTO
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}




//FUNCION RECOLECTAR DATOS
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);

  });
}








