const mongoose = require('mongoose');
const User = require('./user');

const tournamentSchema = new mongoose.Schema({
    eventName: {type: String, required: false, default: `ParTee at ${this.location}`},
    location: {type: String, required: true},
    DateOfEvent: {type: Date, required: true},
    fieldSize: Number,
    category: String,
    description: String,
    imageUrl: String,
    players: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    host: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})

const Tournament = mongoose.model('Tournament', tournamentSchema);
module.exports = Tournament;