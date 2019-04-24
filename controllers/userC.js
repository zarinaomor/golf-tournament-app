const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/new', (req,res) => {
    User.find({}, (err, allUsers) => {
        if(err) {
            res.send(err);
        } else {
            res.render('user/new.ejs', {
                user: allUsers
            });
        }
    });
})

router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        res.redirect("/user")
        console.log(createdUser)
    })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('user/show.ejs', {
            user: foundUser
        })
    })
})

module.exports = router;