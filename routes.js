// we set up our routes and endpoints
const express = require('express');
const routes = express.Router(); 

// set up our cars array that we will use
const cars = [
    { make: 'Ford', model: 'Explorer', price: 46000},
    { make: 'Chevy', model: 'Blazer', price: 29000},
    { make: 'Ford', model: 'Escape', price: 18000},
    { make: 'Jeep', model: 'Grand Cherokee', price: 30500},
];

// now we set up our endpoints
routes.get('/cars', (req, res) => {
    res.send(cars);
    // res.json(cars);  either way works
});

routes.get('/cars/:model', (req, res) => {
    const car = cars.find(car => car.model === req.params.model); // finds the car that matches our model
    if (car) {  // if a car is found send it back
        res.send(car);
    } else {  // otherwise we send the status 404
        res.sendStatus(404);
    }
});

routes.post('/cars', (req, res) => {
    // set up a variable to hold our new car object
    const newCar = {
        make: req.body.make,
        model: req.body.model,
        price: req.body.price
    }
    cars.push(newCar);
    res.status(201).send(newCar)
// you send the status first then your object.
// you can also separate this into two lines like the below
// res.status(201)
// res.send(newCar)
});

routes.get('/cars-limited', (req, res) => {
    // setup a new variable to hold our limited objects
    // use slice method to give us only the number
    const filteredCars = cars.slice(0, parseInt(req.query.limit));
    res.send(filteredCars);
});

routes.get('/cars-search', (req, res) => {
    // set up a variable to hold our maxPrice value
    // since it's a string, we convert it to a number
    const maxPrice = parseInt(req.query.maxPrice);
    const filteredCars = cars.filter(car => car.price <= maxPrice);
    res.send(filteredCars);
})

// make sure you export
module.exports = routes;