const express = require('express');
const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const app = express();
// next is an optional parameter that is used when working with middleware
// What is use? https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');

    // Call the next middleware
    next();
})

app.get('/', (req, res) => {
    res.status = 200;
    res.send('<h1>Hello, world</h1>');
})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
