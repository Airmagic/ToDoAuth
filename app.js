var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');

var mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);
var passport = require('passport');
var passportConfig = require('./config/passport')(passport);

// environment variables

var db_url = process.env.MONGO_URLTODOAUTH;


mongoose.Promise = global.Promise;

mongoose.connect(db_url, {useMongoClient: true })
	.then(() => {console.log('connected to MongoDB')})
	.catch((err) => { console.log('Error connecting to mongoDB', err);});

var tasks = require('./routes/tasks');
var auth = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var store = MongoDBStore( { uri: db_url, collection : 'tasks_sessions'} );
// Configure flash messaging.
app.use(session( {
  secret: 'top secret',
  resave : true,
  saveUninitialized: true,
  store: store
}));

/* using passport for password validation */
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
	
	app.use('/auth', auth);
  app.use('/', tasks);
     
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	if (err.kind === 'ObjectId' && err.name === 'CastError') {
    err.status = 404;
  }
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  


module.exports = app;
