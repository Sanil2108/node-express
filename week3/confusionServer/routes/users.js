const express = require('express');
const bodyParser = require('body-parser');

const User = require('../models/user');

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    // User.findOne({username: req.body.username})
    // .then((user) => {
    //     if (user) {
    //         next(new Error('User with this username already exists'))
    //     }
    //     else {
    //         return User.create({
    //             username: req.body.username,
    //             password: req.body.password,
    //         }).then((user) => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-type', 'application/json');
    //             res.send();
    //         })
    //     }
    // })
    // .catch((err) => next(err))
});

router.post('/login', (req, res, next) => {
    if (!req.session.user) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            const err = new Error('You are not authenticated');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }

        const [userName, password] =
            new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

        if (userName === 'sanil' && password === 'root') {
            req.session.user = 'authenticated';
            res.status(200).end();
        }
        else {
            const err = new Error('You are not authenticated');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }
        
        // User.findOne({username: userName}).then((user) => {
        //     if (user.password === password) {
        //         req.session.user = 'authenticated';
        //     }
        //     else {
        //         const err = new Error('You are not authenticated');
        //         res.setHeader('WWW-Authenticate', 'Basic');
        //         err.status = 401;
        //         return next(err);
        //     }
        // });
    }
    else {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).end('You are already authenticated')
    }
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
