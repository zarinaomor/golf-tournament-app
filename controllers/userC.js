const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tour = require('../models/tournament');

router.post('/login', async (req, res) => {
    try {
      const foundUser = await User.findOne({'email': req.body.email});
      console.log(foundUser)
      if(foundUser){
        console.log(foundUser.validPassword(req.body.password))
        if(foundUser.validPassword(req.body.password)){
          console.log("valid password")
          req.session.message = '';
          req.session.logged = true;
          req.session.usersDbId = foundUser._id;
          req.session.userTimeStamp = new Date();
          console.log(req.session, ' successful in login')
          res.redirect('/home');
  
        } else {
          req.session.message = "Username or password is incorrect";
          res.redirect('user/new.ejs');
        }
  
      } else { 
        res.redirect('/home');
      }
  
  
    } catch(err){
      res.send(err);
    }})

    router.post('/register', async (req, res) => {
        try {
          const createdUser = await User.create(req.body);
          req.session.message = '';
          req.session.logged = true;
          req.session.usersDbId = createdUser._id;
          req.session.userTimeStamp = new Date();    
          console.log(createdUser)
          res.redirect(`/user/${createdUser._id}`);
        
          } catch(err){
            res.send(err)
          }
        });

router.post("/logout", (req, res)=>{
    // res.send("logged out")
    req.session.destroy((err)=>{
      if(err){
        res.send(err)
      } else {
        res.redirect("/home")
      }
    })
  })
  
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
        req.session.userTimeStamp = new Date();    
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


router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
        console.log(req.body)
        if (err){
            console.log(err)
        } else{
            res.redirect(`/user/${req.params.id}`);
        }
    });
});

router.delete("/:id", async(req, res)=>{
    try{
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        for(let i = 0; i < deletedUser.Hosted.length; i++){
            let deletedTour = await Tour.findByIdAndRemove({_id: deletedUser.Hosted[i]})
        }
        for(let i = 0; i < deletedUser.signedUp.length; i++){
            const foundTour = await Tour.findById({_id: deletedUser.signedUp[i]})
            for (let j = 0; j < foundTour.players.length; j++){
                if(foundTour.players[j].toString() === deletedUser._id.toString()){
                    foundTour.players.splice(j, 1);
                }
            }
            foundTour.save();
        }
        req.session.destroy();
        res.redirect("/home");
    } catch(err){
        res.send(err)
    }
})


module.exports = router;