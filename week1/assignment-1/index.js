const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dish-router');

app = express();

app.use(bodyParser.json());

app.use('/dishes', dishRouter);


app.get('/dish/:dishId', (req, res) => {
    res.end('Will send all the dishes dish details of dishId '+req.params.dishId);
});

app.post('/dish/:dishId', (req, res, next) => {
    res.status = 405;
    res.end('POST operation not supported');
});

app.put('/dish/:dishId', (req, res, next) => {
    res.end('Will update the dish with dishId '+req.params.dishId);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish here '+req.params['dishId']);
});


PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
