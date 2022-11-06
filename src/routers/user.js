const express = require('express')
const router = express.Router();
const passport = require('passport');

const { bookSlot, allParkings } = require('../controllers/userController');
const User = require('../models/user')


router.get('/user/signup', async function (req, res) {
    res.send('Signup Page')
});

router.post('/user/signup', async function (req, res) {

    const password = req.body.password;
    const password2 = req.body.password2;

    if (password != password2) {
        console.log('Password and Confirm Password do not match');
        res.redirect('/user/signup');
    }
    else {
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            phoneNumber: req.body.phone,
            role: req.body.role,
            bookedParking: req.body.bookedParking
        });

        User.register(user, req.body.password, function (err, user) {
            if (err) {
                res.json({ success: false, message: "Your account could not be saved. Error: ", err })
            } else {
                // passport.authenticate("userStrategy")(req, res, function(){
                //     res.redirect("/user/secrets");
                // });
                res.json({ success: true, message: "Your account has been saved" })
            }
        });
    }
});

router.get('/user/login', async function (req, res) {
    res.send('Login Page')
});

router.post("/user/login", passport.authenticate("userStrategy", {
    successRedirect: "/user/secrets",
    failureRedirect: "/user/login"
}), function (req, res) {

});

router.get('/user/secrets', async function (req, res) {
    if (req.isAuthenticated()) {
        res.json({ success: true, message: "You have successfully logged in" })
    }
    else {
        res.json({ success: false, message: "You are not Authenticated" })
    }
});

router.get('/user/logout', async function (req, res) {
    req.logOut();
    res.redirect('/user/login');
});

router.get('/parkings/:userId', allParkings)
router.post('./BookSlot', bookSlot);

module.exports = router;