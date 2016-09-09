var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PeopleSchema   = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    school: { type: String, default:"Ben-Gurion University, Information Systems Engineering"},
    title: { type: String, required: true},
    status: { type: String, required: true},
    rank: { type: String, required: true},
    linkedin: { type: String },
    website: {type: String},
    scholar: {type: String},
    gmail: { type: String }
});

module.exports = mongoose.model('people', PeopleSchema);
