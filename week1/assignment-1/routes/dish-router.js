const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})
.get((req, res) => {
    res.end('Will send all the dishes to you');
})
.post((req, res, next) => {
    res.end(`Will add the dish: ${req.body.name} with details ${req.body.description}`);
})
.put((req, res, next) => {
    res.status = 405;
    res.end('PUT operation not supported');
})
.delete((req, res, next) => {
    res.end('Deleting all the dishes here');
});

module.exports = dishRouter;
