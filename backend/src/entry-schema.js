const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    date: { type: String, required: true },
    status: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    notes: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('InternshipEntry', entrySchema);