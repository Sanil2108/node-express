const express = require('express');
const bodyParser = require('body-parser');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser);

leaderRouter.route('/')
.get((req, res, next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.status = 405;
    res.end('PUT operation not supported');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.status = 405;
    res.end('POST operation not supported');
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body,
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;
