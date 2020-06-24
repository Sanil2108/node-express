const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dish-router');
const leaderRouter = require('./routes/leader-router');
const promoRouter = require('./routes/promo-router');

app = express();

app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);

PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
