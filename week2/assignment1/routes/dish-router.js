const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req, res) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(dishes)
    }, (err) => { next(); })
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log(dish)
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(dish)
    }, (err) => { next(); })
    res.end(`Will add the dish: ${req.body.name} with details ${req.body.description}`);
})
.put((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported');
})
.delete((req, res, next) => {
    Dishes.remove({}).then((resp) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(resp)
    }, (err) => { next(); })
});

dishRouter.route('/:dishId')
.get((req, res) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(dish)
    }, (err) => { next(); })
})
.post((req, res) => {
    res.statusCode = 405;
    res.send(`Method not allowed`);
})
.put((req, res) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(dish)
    }, (err) => { next(); })
})
.delete((req, res) => {
    Dishes.findByIdAndRemove(req.params.dishId
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(resp)
    }, (err) => { next(); })
})

module.exports = dishRouter;