
const express = require('express')
const app = express()
app.set('port', 4020)

// To implement the logic to process the HTTP request for static files 
app.use(express.static(__dirname + '/app'))	// ./
app.use(express.static(__dirname + '/app/view'))	// ./
app.use(express.static(__dirname + '/app/control'))	// ./


app.listen(app.get('port'), function(){
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})
