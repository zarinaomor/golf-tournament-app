const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/new', (req,res) => {
    User.find({}, (err, allUsers) => {
        if(err) {
            res.send(err);
        } else {
            res.render('new.ejs', {
                user: allUsers
            });
        }
    });
})

module.exports = router;