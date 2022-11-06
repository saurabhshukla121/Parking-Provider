const express = require('express')
const router = express.Router();
const passport = require('passport');

const { deleteParking, updateParking } = require('../controllers/providerController');
const Provider = require('../models/provider')

router.get('/provider/signup', async function (req, res) {
    res.send('Signup Page')
});

router.post('/provider/signup', async function (req, res) {

    const password = req.body.password;
    const password2 = req.body.password2;

    if (password != password2) {
        console.log('Password and Confirm Password do not match');
        res.redirect('/provider/signup');
    }
    else {
        const provider = new Provider({
            name: req.body.name,
            username: req.body.username,
            phoneNumber: req.body.phone
        });

        Provider.register(provider, req.body.password, function (err, user) {
            if (err) {
                res.json({ success: false, message: "Your account could not be saved. Error: ", err })
            } else {
                // passport.authenticate("providerStrategy")(req, res, function(){
                //     res.redirect("/provider/secrets");
                // });
                res.json({ success: true, message: "Your account has been saved" })
            }
        });
    }
});

router.get('/provider/login', async function (req, res) {
    res.send('Login Page')
});

router.post("/provider/login", passport.authenticate("providerStrategy", {
    successRedirect: "/provider/secrets",
    failureRedirect: "/provider/login"
}), function (req, res) {

});

router.get('/provider/secrets', async function (req, res) {
    if (req.isAuthenticated()) {
        res.json({ success: true, message: "You have successfully logged in" })
    }
    else {
        res.json({ success: false, message: "You are not Authenticated" })
    }
});

router.get('/provider/logout', async function (req, res) {
    req.logOut();
    res.redirect('/provider/login');
});

router.delete('./deleteParking', deleteParking);

router.patch('./updateParking', updateParking);

module.exports = router;