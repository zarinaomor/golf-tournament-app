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

module.exports=router;