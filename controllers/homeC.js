const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.get("/", async(req, res)=>{
    try{
        res.render('home.ejs')
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
          console.log(req.session, ' successful in login')
          res.redirect('/home');
  
        } else {
          req.session.message = "email or password is incorrect";
          res.redirect('/auth/login');
        }
  
      } else { 
        res.redirect('/auth/login');
      }
  
  
    } catch(err){
      res.send(err);
    }})

router.get("/", (req, res)=>{
  req.session.destroy((err)=>{
    if(err){
      res.send(err)
    } else {
      res.redirect("/home")
    }
  })
})

module.exports = router;