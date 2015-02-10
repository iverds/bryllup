#!/bin/env node

var express = require('express');
var fs      = require('fs');
var mongodb = require('mongodb');
var path    = require('path');
var lessMiddleware = require('less-middleware');
var session = require('express-session')
var passport = require('passport');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var FacebookStrategy = require('passport-facebook').Strategy;




var App = function(){

  // Scope
  var self = this;

  // Setup
  self.dbServer = new mongodb.Server(process.env.OPENSHIFT_MONGODB_DB_HOST || "localhost",parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT || 27017));
  self.db = new mongodb.Db(process.env.OPENSHIFT_APP_NAME || "bryllup", self.dbServer, {auto_reconnect: true});
  self.dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME || "root";
  self.dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || "mycomplexpassword";

  self.ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
  self.port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 3000;
  if (typeof self.ipaddr === "undefined") {
    console.warn('No OPENSHIFT_NODEJS_IP environment variable');
  };
  // Web app urls
  self.app  = express();

  //This uses the Connect frameworks body parser to parse the body of the post request
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  // parse application/x-www-form-urlencoded
  self.app.use(bodyParser.urlencoded());
  // parse application/json
  self.app.use(bodyParser.json());
  // override with POST having ?_method=DELETE
  self.app.use(methodOverride('_method'))



  //Views
  self.app.set('views', path.join(__dirname, 'views'));
  self.app.set('view engine', 'ejs');

  //Static files

  self.app.use(lessMiddleware(path.join(__dirname + '/public')));
  self.app.use(express.static(path.join(__dirname, 'public')));
  self.app.use(cookieParser());
  self.app.use(bodyParser());
  self.app.use(session({ secret: 'keyboard cat' }));
  self.app.use(passport.initialize());
  self.app.use(passport.session());

  var routes = require('./routes/index');

  self.app.use('/', routes);

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  self.app.get('/auth/facebook', passport.authenticate('facebook'));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  self.app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/login' }));


  passport.serializeUser(function(user, done) {
    done(null, user.name);
  });

  passport.deserializeUser(function(id, done) {
      done(null, id);
  });

  // Logic to open a database connection. We are going to call this outside of app so it is available to all our functions inside.
  self.connectDb = function(callback){
    self.db.open(function(err, db){
      if(err){ throw err };
      self.db.authenticate(self.dbUser, self.dbPass, {authdb: "admin"}, function(err, res){
        if(err){ throw err };
        callback();
      });
    });
  };


  //starting the nodejs server with express
  self.startServer = function(){
    self.app.listen(self.port, self.ipaddr, function(){
      console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddr, self.port);
    });
  }

  // Destructors
  self.terminator = function(sig) {
    if (typeof sig === "string") {
      console.log('%s: Received %s - terminating Node server ...', Date(Date.now()), sig);
      process.exit(1);
    };
    console.log('%s: Node server stopped.', Date(Date.now()) );
  };

  process.on('exit', function() { self.terminator(); });

  self.terminatorSetup = function(element, index, array) {
    process.on(element, function() { self.terminator(element); });
  };

  ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'].forEach(self.terminatorSetup);

};

//make a new express app
var app = new App();

//call the connectDb function and pass in the start server command
app.connectDb(app.startServer);
