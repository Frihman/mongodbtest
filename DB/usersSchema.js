const mongoose = require('mongoose');

const connectDB = require('./connection.js');

connectDB();

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
