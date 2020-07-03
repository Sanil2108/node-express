const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})
.get((req, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res, next) => {
    res.end(`Will add the promotion: ${req.body.name} with details ${req.body.description}`);
})
.put((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported');
})
.delete((req, res, next) => {
    res.end('Deleting all the promotions here');
});

promoRouter.route('/:promotionId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})
.get((req, res) => {
    res.end('Will send promotion to you '+req.params.promotionId);
})
.post((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported');
})
.put((req, res, next) => {
    res.end(`Will update ${req.params.promotionId}`)
})
.delete((req, res, next) => {
    res.end(`Will delete ${req.params.promotionId}`)
});

module.exports = promoRouter;
