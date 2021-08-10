// Initialize our modules
let mongoose = require('mongoose');
let express = require('express');
let app = express();
const url = require('url');
const port = 8080;

// Import routes
let routes = require("./routes");

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Use routes file
app.use('/objects', routes);

// Change the 404 message
app.use(function(req, res, next) {
  var q = url.parse(req.url, true);
  var path = q.pathname;

  console.log(path + ' Not Found');
  res.status(404).send(path + " Not Found");

});

// Launch app on specified port
app.listen(port, function () {
  console.log("Service running on port " + port);
});
