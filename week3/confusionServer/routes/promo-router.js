const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req, res, next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.status = 405;
    res.end('PUT operation not supported');
})
.delete((req, res, next) => {
    Promotions.remove({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promotionId')
.get((req, res, next) => {
    Promotions.findById(req.params.promotionId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.status = 405;
    res.end('POST operation not supported');
})
.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body,
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;
