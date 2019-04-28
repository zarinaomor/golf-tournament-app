const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament');
const User = require('../models/user');

router.get('/host', (req, res)=>{
    // Here we are finding all the authros
    // so we can create the select menu inside of articles/new
    if(req.session.logged==true){res.render('tournaments/host.ejs')}
    else{res.redirect('/auth/login')}
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
if (req.session.logged==true)try{
res.render('tournaments/index.ejs', {
    tournaments: foundTournaments
    });}catch(err){res.send(err)}else {
        res.redirect('/auth/login')
    }
})

router.get('/cat/:cat', async (req, res)=>{
    const foundTournaments = await Tournament.find({category: req.params.cat})
    try{
    res.render('tournaments/index.ejs', {
        tournaments: foundTournaments
        });}catch(err){res.send(err)}
    })

router.get('/:id', (req, res)=>{
    // req.params.id is the articles id
    Tournament.findById(req.params.id)
        .populate('host').exec((err,foundTournament)=>{
            res.render('tournaments/show.ejs', {    
                tournament: foundTournament,
                name: foundTournament.host[0].firstName,
                last: foundTournament.host[0].lastName
                })}  
)})

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