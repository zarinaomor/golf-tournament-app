const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament');

router.get('/host', (req, res)=>{
    // Here we are finding all the authros
    // so we can create the select menu inside of articles/new
    res.render('tournaments/host.ejs')
  });

router.post('/', async (req, res)=>{
    try {const createdTournament = await Tournament.create(req.body)
        res.redirect('/tour')
        }
        catch(err){res.send(err)}})
//This doesn't have it where it also adds this to 'tournaments hosted' in the user DB but I'll do that after we get authentication and the session stuff lined up

router.get('/', async (req, res)=>{
const foundTournaments = await Tournament.find({})
try{
res.render('tournaments/index.ejs', {
    tournaments: foundTournaments
    });}catch(err){res.send(err)}
})
  


module.exports = router;