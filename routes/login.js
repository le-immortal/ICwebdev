var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var Event = require('../models/events');

var router = express.Router();
router.use(bodyParser.json());


router.get('/', (req,res) =>{
    
    if (req.user) {
      res.redirect('/events');
    } else {
    res.render('login');
  }
})
 router.post('/', passport.authenticate('local'),(req, res) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.redirect('/events');
 });

 module.exports = router;