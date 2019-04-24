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

module.exports = router;