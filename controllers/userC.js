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
        const newUser = await User.create(req.body);
        req.session.message = '';
        req.session.logged = true;
        req.session.usersDbId = newUser._id;
        res.redirect(`/user/${newUser._id}`);

    } catch(err){
        res.send(err)
    }
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .populate('Hosted').populate('signedUp')
    .exec((err, foundUser) => {
        console.log(foundUser);
        res.render('user/show.ejs', {
            user: foundUser
        })
    })
})



router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('user/edit.ejs', {
            user: foundUser
        })
    })
})

router.delete('/:id', (req, res)=> {
    User.findByIdAndRemove(req.params.id, ()=>{
		res.redirect('/home');
	});
})

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
        res.redirect(`/user/${req.params.id}`);
    });
});





module.exports = router;