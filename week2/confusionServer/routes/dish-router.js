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
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json')
        res.json(resp)
    }, (err) => { next(); })
});

dishRouter.route('/:dishId/comments')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish) {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json')
            res.json(dish.comments)
        }
        else {
            const err = new Error('Dish ' + req.params.dishId + ' not found')
            err.status = 404;
            return next(err);
        }
    }, (err) => { next(); })
})
.post((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish) {
            dish.comments.push(req.body);
            dish.save().then((dish) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(dish);
            })
        }
        else {
            err = new Error('Dish does not exist');
            err.status = 404;
            return next(err);
        }
    }, (err) => { next(); })
})
.put((req, res, next) => {
    res.statusCode = 405;
    res.end('PUT operation not supported on /dishes/'+req.params.dishId);
})
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish) {
            for (let i = 0; i < dish.comments.length; i += 1) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save().then((dish) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(dish);
            })
        }
        else {
            err = new Error('Dish does not exist');
            err.status = 404;
            return next(err);
        }
    }, (err) => { next(); })
});

dishRouter.route('/:dishId/comments/:commentId')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish && dish.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json')
            res.json(dish.comments[req.params.commentId]);
        }
        else if (!dish) {
            const err = new Error('Dish ' + req.params.dishId + ' not found')
            err.status = 404;
            return next(err);
        }
        else {
            const err = new Error('Comment ' + req.params.commentId + ' not found')
            err.status = 404;
            return next(err);
        }
    }, (err) => { next(); })
})
.post((req, res, next) => {
    res.statusCode = 405;
    res.send(`Method not allowed`);
})
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish && dish.comments.id(req.params.commentId)) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save().then((dish) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(dish);
            });
        }
        else if (!dish) {
            const err = new Error('Dish ' + req.params.dishId + ' not found')
            err.status = 404;
            return next(err);
        }
        else {
            const err = new Error('Comment ' + req.params.commentId + ' not found')
            err.status = 404;
            return next(err);
        }
    }, (err) => { next(); })
})
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish && dish.comments.id(req.params.commentId)) {
            dish.comments.id(req.params.commentId).remove();
            dish.save().then((dish) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(dish);
            });
        }
        else if (!dish) {
            const err = new Error('Dish ' + req.params.dishId + ' not found')
            err.status = 404;
            return next(err);
        }
        else {
            const err = new Error('Comment ' + req.params.commentId + ' not found')
            err.status = 404;
            return next(err);
        }
    }, (err) => { next(); });
});

module.exports = dishRouter;