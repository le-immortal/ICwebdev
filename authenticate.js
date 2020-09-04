var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.verifyAdmin = function(req, res, next){
    User.findOne({_id: req.body._id})
    .then((user)=>{
        console.log('User: ', req.user);
        if(req.user.admin){
            next();
        }
        else{
            err = new Error('You are not an admin');
            err.status = 403;
            return next(err);
        }   
    },(err)=> next(err))
    .catch((err) => next(err));
};