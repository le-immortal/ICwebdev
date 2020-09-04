var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());
router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.Email, name: req.body.Name, contact: req.body.Contact}), 
      req.body.password, (err, user) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      }
    });
  });

  router.post('/', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged in!'});
  });

  module.exports = router;
