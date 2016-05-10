var express = require( 'express' );
var app = express();
var swig = require('swig');
var bodyParser = require('body-parser');
var routes = require('./routes/');
var models = require('./models');
var path = require('path');
var Promise = require('bluebird');

Promise.all([
  models.Place.sync({/*force: true*/}),
  models.Hotel.sync({/*force: true*/}),
  models.Activity.sync({/*force: true*/}),
  models.Restaurant.sync({/*force: true*/})
])
.then(function () {
  app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
  });
})
.catch(console.error);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, './node_modules/jquery/dist')));
app.use('/', routes);

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send("Error");
});




