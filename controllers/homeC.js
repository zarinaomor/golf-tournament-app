const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.get("/", async(req, res)=>{
    try{
      const currentUser = await User.findById(req.session.usersDbId)   
      res.render('home.ejs', {
        user: currentUser,
        session: req.session.logged
        })
    } catch(err){
        res.send(err)
    }
})

router.post('/', async (req, res) => {
    try {
      const foundUser = await User.findOne({'email': req.body.email});
      console.log(foundUser)
      if(foundUser){
        if(foundUser.validPassword(req.body.password)){
          req.session.message = '';
          req.session.logged = true;
          req.session.usersDbId = foundUser._id;
          req.session.timeStamp = new Date();    
          console.log(req.session, ' successful in login')
          res.redirect(`/user/${foundUser._id}`);
  
        } else {
          req.session.message = "email or password is incorrect";
          console.log(req.session);
          res.redirect('/auth/login');
        }
  
      } else { 
        res.redirect('/auth/login');
      }
  
  
    } catch(err){
      res.send(err);
    }})

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

router.put('/:id', (req, res) => {
  Tournament.findByIdAndUpdate(req.params.id, req.body, (err, updatedTournament) => {
      res.redirect(`/tour/${req.params.id}`);
  });
});

module.exports = router;