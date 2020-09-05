const express = require('express');
const bodyParser = require('body-parser');
const Event = require('../models/events');
const User = require('../models/user');
const authenticate = require('../authenticate');    
const router = express.Router();

router.route('/')
.get( (req,res,next)=>{
    Event.find()
    .then((event)=>{
        page= [];
        page =event;
        console.log(page);
        if(page.length > 0){
           
            res.render('event', page);
          
        }
        else{
            res.send("no data found");
        }
    })
})


module.exports = router;