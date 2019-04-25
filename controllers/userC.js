const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tour = require('../models/tour');

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
1
router.post('/', (req, res) => {
    console.log(req.body)
    User.create(req.body, (err, createdUser) => {
        console.log(err)
        console.log(createdUser)
        res.redirect(`/user/${createdUser._id}`)
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