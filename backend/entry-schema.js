const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    date: String,
    status: String,
    company: String,
    role: String,
    notes: String
})

module.exports = mongoose.model('InternshipEntry', entrySchema);