const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/confusion';
const connection = mongoose.connect(url);
connection.then((db) => {
    console.log("Connected to the server");

    const newDish = Dishes({
        name: 'dish4',
        description: 'description1'
    });
    newDish.save().then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated desc' },
        }, {
            new: true,
        }).exec();
    })
    .then((dish) => {
        dish.comments.push({
            rating: 5,
            comment: 'Nice dish',
            author: "Sanil"
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
    })
    .then(() => {
        mongoose.connection.close();
    });
})
