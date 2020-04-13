var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser'),
  cors = require('cors');


var corsOption = {
    origin:true,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    exposedHeaders:['x-auth-token']
  };

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOption));


var routes = require('./api/routes/todoListRoute'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'content-type');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.status(404).send({url: req.originalUrl + ' not found'})
});
