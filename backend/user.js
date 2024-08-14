const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true } // Store the salt for scrypt
});

module.exports = mongoose.model('User', userSchema);
