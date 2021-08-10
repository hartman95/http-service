// Initialize our modules
let mongoose = require('mongoose');
let express = require('express');
const url = require('url');

// Initialize app
let app = express();

// Set port
const port = 8080;

// Import routes
let routes = require("./routes");

// Connect to database
mongoose.connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Use routes file
app.use('/objects', routes);

// Change the 404 message
app.use(function(req, res, next) {
  let q = url.parse(req.url, true);
  let path = q.pathname;
  res.status(404).send(path + ' Not Found');
});

// Launch app on specified port
app.listen(port, function () {
  console.log('Service running on port ' + port);
});
