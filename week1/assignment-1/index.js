const express = require('express');
const bodyParser = require('body-parser');

app = express();

app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
});

app.get('/dishes', (req, res) => {
    res.end('Will send all the dishes to you');
});

app.post('/dishes', (req, res, next) => {
    res.end(`Will add the dish: ${req.body.name} with details ${req.body.description}`);
});

app.put('/dishes', (req, res, next) => {
    res.status = 405;
    res.end('PUT operation not supported');
});

app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all the dishes here');
});




app.get('/dish/:dishId', (req, res) => {
    res.end('Will send all the dishes dish details of disId '+req.params.dishId);
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





// router.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('Hello world');
// })

PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
