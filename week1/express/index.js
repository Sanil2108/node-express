const express = require('express');
const http = require('http');

const PORT = 3000;

const app = express();
const router = express.Router();


app.listen(PORT, () => {
    console.log(`Running app on ${PORT}`);
})
