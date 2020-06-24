const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser);

leaderRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})
.get((req, res) => {
    res.end('Will send all the leaders to you');
})
.post((req, res, next) => {
    res.end(`Will add the leader: ${req.body.name} with details ${req.body.description}`);
})
.put((req, res, next) => {
    res.status = 405;
    res.end('PUT operation not supported');
})
.delete((req, res, next) => {
    res.end('Deleting all the leaders here');
});

leaderRouter.route('/:leaderId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})
.get((req, res) => {
    res.end('Will send leader to you '+req.params.leaderId);
})
.post((req, res, next) => {
    res.status = 405;
    res.end('PUT operation not supported');
})
.put((req, res, next) => {
    res.end(`Will update ${req.params.leaderId}`)
})
.delete((req, res, next) => {
    res.end(`Will delete ${req.params.leaderId}`)
});

module.exports = leaderRouter;
