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



//ruta y Json , funcion que media entre las peticiones y el servidor 

var bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({extended:true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




app.use(express.static('2'));

var path = __dirname + '/';

var customers = [];



/*
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});
*/



app.get("/",function(req,res){
  res.sendFile(path + "index.html");
});



//Jquery



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
 /*
 insertDocuments(db, function() {
  findDocuments(db, function() {
  });
 });
*/

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



app.post("/registro",function(req,res)

{
console.log(req.body);

 const db = client.db(dbName);
const collection = db.collection('documents');
  // Insert some documents
  collection.insertOne(req.body)
res.status(200).send("usuario registrado")



collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)

  });




}

  );


app.post("/login",function(req,res)

{


console.log(req.body)


 const db = client.db(dbName);
const collection = db.collection('documents');


collection.find(req.body).toArray(function(err, docs) {
    assert.equal(err, null);


    console.log("Found the following records");
    console.log(docs)
     console.log(docs.length)

if(docs.length==0)
{
res.send("False")
  console.log("usuario no registrado");

}
else
{

res.send("True")

}



  });

}

  );


app.post("/accionadores",function(req,res)

{

const db = client.db(dbName);


const collection = db.collection('accionadores');


collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
res.send(docs)
  });

console.log("peticion recibida")

}

  );



app.post("/nodos",function(req,res)

{

const db = client.db(dbName);


const collection = db.collection('nodos');


collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
res.send(docs)
  });

console.log("peticion recibida")

}

  );





var mqtt = require('mqtt')
var client2  = mqtt.connect('mqtt://localhost:1883')
 
client2.on('connect', function () {


  client2.subscribe('nodo1', function (err) {
    if (!err) {
      client2.publish('nodo1', 'pico')
    }
  })

   client2.subscribe('nodo2', function (err) {
    if (!err) {
      client2.publish('nodo2', 'pico')
    }
  })

  
})
 
client2.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())

})











