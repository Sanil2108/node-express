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
    res.statusCode = 405;
    res.end('PUT operation not supported');
})
.delete((req, res, next) => {
    res.end('Deleting all the dishes here');
});

dishRouter.route('/:dishId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})
.get((req, res) => {
    res.send(`Will give you dish with the dishId${req.params.dishId}`);
})
.post((req, res) => {
    res.statusCode = 405;
    res.send(`Method not allowed`);
})
.put((req, res) => {
    res.send(`Will put the ${req.params.dishId}`)
})
.delete((req, res) => {
    res.send(`Will delete the ${req.params.dishId}`);
})

module.exports = dishRouter;