const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament');
const User = require('../models/user');

router.get('/host', (req, res)=>{
    // Here we are finding all the authros
    // so we can create the select menu inside of articles/new
    res.render('tournaments/host.ejs')
  });


  router.put('/:id', async (req, res)=>{
   const foundTour = await Tournament.findById(req.params.id);
   const foundUser = await User.findById(req.session.usersDbId)
   foundTour.players.push(foundUser._id)
   foundTour.save();
   
   foundUser.signedUp.push(foundTour._id);
   foundUser.save();
   console.log(foundUser)
   console.log(foundTour)
   res.redirect('/tour')
})

router.post('/', async (req, res)=>{
    try {
        const createdTournament = await Tournament.create(req.body)
        const foundUser = await User.findById(req.session.usersDbId)
        foundUser.Hosted.push(createdTournament._id)
        foundUser.save()
        createdTournament.host.push(foundUser._id)
  
        createdTournament.save()
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

router.get('/:id', (req, res)=>{
    // req.params.id is the articles id
    Tournament.findById(req.params.id)
        .populate('host').exec((err,foundTournament)=>{
            console.log(foundTournament)
            res.render('tournaments/show.ejs', {    
                tournament: foundTournament,
                name: foundTournament.host[0].firstName,
                last: foundTournament.host[0].lastName
                })}  
)})

  


module.exports = router;