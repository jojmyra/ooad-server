// Student.model.js
var mongoose = require('mongoose');
var studentSchema = mongoose.Schema({
    id : {type: String, require: true},
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    email: {type: String, require: true, lowercase: true, trim: true},
    status: {type: String, require: true},
    faculty: {type: String, require: true},
    major: {type: String, require: true}
},{
    collection: 'person'
});

var Student = mongoose.model('Student', studentSchema);
module.exports = Student;