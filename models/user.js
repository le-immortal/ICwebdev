var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    contact:{
        type:Number,
        default: false
    },
    admin:{
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);