const express = require('express');
const bodyParser = require('body-parser');

const passport = require('passport');

const User = require('../models/user');

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) =>
    {
        if (err) {
            res.statusCode = 500;
            res.json({err});
        }
        else {
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.send('Registration successful');
            });
        }
    })
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.send('login successful');
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.clearCookie('session_id')
        res.status(200).end();
    }
    else {
        res.status(400).end('You are not logged in');
    }
})

module.exports = router;
