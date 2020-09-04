const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require('passport');
var authenticate = require('./authenticate');

const userRouter = require('./routes/user');

const url = 'mongodb://localhost:27017/Events';
const connect = mongoose.connect(url,{
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

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);

function auth (req, res, next) {
    console.log(req.body.Email);

    if (!req.body.Email) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      res.render('signup');
      next(err);
    }
    else {
          next();
    }
}
app.use(auth);

app.listen(3000, ()=>{
    console.log("Server Ready");
});