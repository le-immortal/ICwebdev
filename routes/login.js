var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());


router.get('/', (req,res) =>{
    res.render('login');
})
 router.post('/', passport.authenticate('local'),(req, res) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.redirect('/events');
 });

 module.exports = router;