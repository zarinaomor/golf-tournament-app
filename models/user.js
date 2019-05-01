const mongoose = require('mongoose');
const Tournament = require('./tournament')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: String,
    email: {type: String, unique: true, required: true},
    city: String,
    biography: String,
    password: {type: String, required: true},
    handicap: Number,
    signedUp: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'
    }],
    Hosted: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'
    }],
    notifications: [String]
})

userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

userSchema.pre("save", function(next){
    if (this.isModified("password")){
        this.password = this.hashPassword(this.password)
    } 
    next()
})

const User = mongoose.model('User', userSchema);
module.exports = User;