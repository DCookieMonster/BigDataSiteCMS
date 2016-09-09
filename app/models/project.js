var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;



var ProjectSchema   = new Schema({
    name: { type : String, required:true, unique:true, index:true },
    peopleon_the_project : { type : String},
    supervisors: { type : String},
    completion_date: { type : String}
});

module.exports = mongoose.model('projects', ProjectSchema);
