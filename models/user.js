const mongoose = require('mongoose');
const Tournament = require('./tournament')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    handicap: Number,
    signedUp: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'
    }],
    Hosted: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;