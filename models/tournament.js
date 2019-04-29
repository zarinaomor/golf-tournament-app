const mongoose = require('mongoose');
const User = require('./user');

const tournamentSchema = new mongoose.Schema({
    eventName: {type: String, default: `ParTee at ${this.city}`},
    golfCourse: {type: String, required: true},
    city: {type: String, required: true},
    eventDate: {type: Date, required: true},
    groupSize: Number,
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