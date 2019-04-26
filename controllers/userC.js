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


// router.delete('/:id', (req, res)=> {
//     User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
//       if(err){
//         res.send(err);
//       } else {
//         console.log(deletedUser);
//         Tour.deleteMany({
//           _id: {
//             $in: deletedUser.signedUp
//           }
//         }, (err, data) => {
//           console.log(data)
//           res.redirect('/user');
//         })
//       }
//     })
//   })
  
router.delete("/:id", async(req, res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        for(let i = 0; i < deletedUser.Hosted.length; i++){
            const deletedTour = await Tour.findByIdAndRemove(deletedUser.Hosted[i])
            console.log(deletedTour)
        }
        for(let i = 0; i < deletedUser.signedUp.length; i++){
            const foundTour = await Tour.findById(deletedUser.signedUp[i])
            for (let j = 0; j < foundTour.players.length; j++){
                if(foundTour.players[j] === req.params.id){
                    foundTour.players.splice(j, 1)
                }
            }
        }
        req.session.logged = null;
        res.redirect("/home");
    } catch(err){
        res.send(err)
    }
})

module.exports = router;