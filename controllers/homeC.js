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
  
      if(foundUser){
        if(foundUser.validPassword(req.body.password)){
          res.session.message = '';
          req.session.logged = true;
          req.session.usersDbId = foundUser._id;
          console.log(req.session, ' successful in login')
          res.redirect('/home');
  
        } else {
          req.session.message = "email or password is incorrect";
          res.redirect('/auth/login');
        }
  
      } else { 
        res.redirect('/auth');
      }
  
  
    } catch(err){
      res.send(err);
    }})

module.exports = router;