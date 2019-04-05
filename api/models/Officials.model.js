// Officials.model.js
var mongoose = require('mongoose');
var officialSchema = mongoose.Schema({
    username : {type: String, require: true, unique: true, dropDups: true},
    password : {type: String, require: true},
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    email: {type: String, require: true, lowercase: true, trim: true, unique: true, dropDups: true},
    position: {type: String, require: true}

},{
    collection: 'person'
});

var Official = mongoose.model('Official', officialSchema);
module.exports = Official;