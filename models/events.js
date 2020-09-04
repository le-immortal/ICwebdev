var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description :{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Event', Event);