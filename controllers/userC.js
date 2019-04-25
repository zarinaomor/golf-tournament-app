const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tour = require('../models/tournament');

router.get('/new', (req,res) => {
    User.find({}, (err, allUsers) => {
            if(err) {
                res.send(err);
            } else {
                res.render('user/new.ejs', {
                    user: allUsers
                });
            }
        });
    })
1
router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findOne({'email': req.body.email});
        console.log(foundUser)
        if(foundUser) {
            console.log(foundUser.validPassword(req.body.password))
            if(foundUser.validPassword(req.body.password)) {
                console.log("valid password")
                req.session.message = '';
                req.session.logged = true;
                req.session.userDbId = foundUser._id;
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
    }
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .populate('tournament')
    .exec((err, foundUser) => {
        console.log(foundUser);
        res.render('user/show.ejs', {
            user: foundUser
        })
    })
})


router.delete('/:id', (req, res)=> {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
      if(err){
        res.send(err);
      } else {
        console.log(deletedUser);
        Tour.deleteMany({
          _id: {
            $in: deletedUser.signedUp
          }
        }, (err, data) => {
          console.log(data)
          res.redirect('/user');
        })
      }
    })
  })
  

module.exports = router;