const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tour = require('../models/tournament');

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

    router.post('/', async (req, res) => {
        try {
            const foundUser = await User.findOne({'email': req.body.email});
            console.log(foundUser)
            if(foundUser) {
                console.log(foundUser.validPassword(req.body.password))
                if(foundUser.validPassword(req.body.password)) {
                    console.log("valid password")
                    req.session.message = '';
                    req.session.logged = true;
                    req.session.userDbId = foundUser._id;
                    console.log(req.session, ' successful in login')
                    res.redirect('/home');
    
                } else {
                    req.session.message = "Username or password is incorrect";
                    res.redirect('/auth/login');
                }
            } else {
                res.redirect('/auth/login');
            }
    
        } catch(err){
            res.send(err);
        }
    })


module.exports = router;