const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require('passport');
var authenticate = require('./authenticate');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const userRouter = require('./routes/user');
const eventRouter = require('./routes/events');
const loginRouter = require('./routes/login');
const editRouter = require('./routes/edit');

const url = 'mongodb://localhost:27017/Events';
const connect = mongoose.connect(url,{
    useCreateIndex: true,
    useUnifiedTopology:true,
    useNewUrlParser: true
});
connect.then((db) => {
    console.log('Connected correctly  to Server');
  }, (err) => { console.log(err) });

const app = express();


app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true, useUnifiedTopology: true}));
app.use(express.static("public"));

app.use(session({
    name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);
app.use('/login', loginRouter);


function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      res.redirect('/login');
      next(err);
    }
    else {
          next();
    }
}
app.use(auth);

app.use('/events', eventRouter);
app.use('/edit', editRouter);


app.listen(3000, ()=>{
  console.log("Server Ready");
});
