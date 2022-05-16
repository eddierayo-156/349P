
const express = require('express')
const cors = require('cors')
const app = express()
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.set('port', 3000)

app.use(express.json())
app.use(cors()) 

// Retrieves all Items based off type
// app.get('/api/workout/:type', function(req, res){

// 	const type = req.params.type
// 	if (Object.keys(req.query).length == 0) {
// 		MongoClient.connect(url, function(err, db) {
// 		  if (err) throw err;
// 		  const dbo = db.db("Workout");
// 		  dbo.collection("workout").find({}).toArray(function(err, result) {
// 			if (err) throw err;
// 			db.close()
// 			res.type('application/json')
// 			res.status(200)
// 			res.send(result)
// 		  });
// 		});		
// 	}
// })


// get workout details
app.get('/api/test/:id', function(req, res){
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('FTWorkout')
			const coll = db.collection('test')
			const criteria = {_id: new mongo.ObjectID(req.params.id)}
			coll.find(criteria).toArray(function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

// Retrieves all Items 
app.get('/api/test/', function(req, res){
	if (Object.keys(req.query).length == 0) {
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  const dbo = db.db("FTWorkout");
		  dbo.collection("test").find({}).toArray(function(err, result) {
			if (err) throw err;
			db.close()
			res.type('application/json')
			res.status(200)
			res.send(result)
		  });
		});		
	}
})

// Adds Item to Shopping List
app.post('/api/test', function(req, res) {
	MongoClient.connect(url, function(err, conn) {
	  if (err) throw err;
	  var dbo = conn.db("FTWorkout");

	  const myObj = new Object()
	  myObj.title = req.body.title
	  myObj.name  = req.body.name
	  myObj.type  = req.body.type
	  myObj.sets  = req.body.sets
	  myObj.reps  = req.body.reps
	  myObj.time  = req.body.time

	  dbo.collection("test").insertOne(myObj, function(err, result) {
		  if (err) console.log(err)
		  else {
			  res.type('application/json')
			  res.status(200)
			  res.json(result)
		  }
	  })		
	})
})

// Delete an Item
app.put('/api/test/:id', function(req, res){
	const id = req.body.id
	console.log("ID Deleting: ")
	// console.log(`${req.body.id} `)
	const criteria = {_id : new mongo.ObjectID(req.params.id)}
	const newValues = req.body
	MongoClient.connect(url, function(err, conn) {
		if (err) throw err;
		const dbo = conn.db("FTWorkout");
		dbo.collection('test').deleteOne({"_id": mongo.ObjectId(id)}, function(err, result){
			if
			 (err) console.log(err)
			else {
				//
				res.type('application/json')
				res.status(200)
				res.json(result)
			}
		})
  	})
})

app.listen(app.get('port'), function(){
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})
