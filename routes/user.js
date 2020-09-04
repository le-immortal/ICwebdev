var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();

router.use(bodyParser.json());

router.get('/', (req,res) =>{
  res.render('signup');
})

router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.username, name: req.body.name, contact: req.body.contact}), 
      req.body.password, (err, user) => {
      if(err) {
        res.send(err);
      }
      else {
        passport.authenticate('local')(req, res, () => {
          res.redirect('/events');
        });
      }
    });
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.render('login');
  });
  
  
  module.exports = router;
