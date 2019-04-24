const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req,res)=>{
    res.render('login.ejs')
})

router.post('/register', async (req, res) => {
    try {
      const createdUser = await User.create(req.body);
      console.log(createdUser)

      res.redirect('/home');
  
    } catch(err){
      res.send(err)
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const foundUser = await User.findOne({'username': req.body.username});
  
      if(foundUser){
        if(foundUser.validPassword(req.body.password)){
          res.session.message = '';
          req.session.logged = true;
          req.session.usersDbId = foundUser._id;
          console.log(req.session, ' successful in login')
          res.redirect('/home');
  
        } else {
          req.session.message = "Username or password is incorrect";
          res.redirect('/auth/login');
        }
  
      } else { 
        res.redirect('/auth');
      }
  
  
    } catch(err){
      res.send(err);
    }})

module.exports=router;