// Professor.model.js
var mongoose = require('mongoose');
var professorSchema = mongoose.Schema({
    username : {type: String, require: true},
    password : {type: String, require: true},
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    email: {type: String, require: true, lowercase: true, trim: true},
    status: {type: String, require: true},
    position: {type: String, require: true}
},{
    collection: 'person'
});

var Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;