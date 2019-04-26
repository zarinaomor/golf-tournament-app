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



  
router.delete("/:id", async(req, res)=>{
    try{
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        // for(let i = 0; i < deletedUser.Hosted.length; i++){
        //     let deletedTour = await Tour.findByIdAndRemove({_id: deletedUser.Hosted[i]})
        //     console.log(deletedTour, "<====== was deleted")
        // }
        for(let i = 0; i < deletedUser.signedUp.length; i++){
            const foundTour = await Tour.findById({_id: deletedUser.signedUp[i]})
            console.log(foundTour.players, "<====== foundTour.players ARRAY")
            console.log(foundTour.players[12], typeof foundTour.players[0], '<===== the type for found.players[0]')
            console.log(deletedUser._id, typeof deletedUser._id, "<====== the type for the deleteUser _id")
            for (let j = 0; j < foundTour.players.length; j++){
                console.log("==== went through second for loop ====")
                console.log('player',typeof foundTour.players[j])
                console.log('user',typeof deletedUser._id.toString())
                console.log(foundTour.players[j].toString() === deletedUser._id.toString())
                if(foundTour.players[j] == deletedUser._id.toString()){
                    console.log(foundTour.players[j], "<===== should be removed")
                    foundTour.players.splice(j, 1)
                    console.log(foundTour.players, "<===== array of players - above should have been removed")
                }
            }
        }
        req.session.logged = null;
        res.redirect("/home");
    } catch(err){
        res.send(err)
    }
})

router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('user/edit.ejs', {
            user: foundUser
        })
    })
})

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
        res.redirect(`/user/${req.params.id}`);
    });
});





module.exports = router;