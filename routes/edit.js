const express = require('express');
const bodyParser = require('body-parser');
const Event = require('../models/events');
const authenticate = require('../authenticate');    
const router = express.Router();


router.route('/')
.get( (req,res,next)=>{
    res.render('edit');
})
.post(authenticate.verifyAdmin, (req, res, next)=>{
    Event.create(req.body)
    .then((event) => {
        console.log('Event Created', event);
        res.statusCode = 200;         
        res.redirect('/events');
        
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.put(authenticate.verifyAdmin, (req,res,next) =>{
    res.statusCode = 403;
    res.end('Put operation is not supported');
})
.delete(authenticate.verifyAdmin, (req,res,next)=>{
    Event.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.redirect('events');
    },(err)=> next(err))
    .catch((err)=> next(err));
})


router.route('/:id')
.get( (req,res,next)=>{
    Event.findById(req.params.id)
    .then((event) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event); 
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.post(authenticate.verifyAdmin, (req, res, next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported '+req.params.id);
})
.put(authenticate.verifyAdmin, (req,res,next) =>{
    Event.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new: true})
    .then((event)=>{
        res.statusCode = 200;
        res.redirect('/events');
        res.json(event);
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.delete(authenticate.verifyAdmin, (req,res,next)=>{
    Event.findByIdAndRemove(req.params.id)
    .then((resp)=>{
        res.statusCode = 200;
        res.redirect('/events');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=> next(err));
})



module.exports = router;