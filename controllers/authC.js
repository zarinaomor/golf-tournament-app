const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', (req,res)=>{
    res.render('login.ejs')
})

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
          res.redirect('/auth/login');
        }
  
      } else { 
        res.redirect('/auth/login');
      }
  
  
    } catch(err){
      res.send(err);
    }})

module.exports=router;