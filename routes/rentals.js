const { Rental,  validate } = require('../modules/rental');
const { Movie } = require('../modules/movie');
const { Customer } = require('../modules/customer');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

Fawn.init('mongodb://127.0.0.1:27017/yourdbnamehere');

router.get('/', async function (req, res) {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async function (req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if(!customer) return res.status(400).send('Invalid customer.')

  const movie = await Movie.findById(req.body.movieId);
  if(!movie) return res.status(400).send("Invalid movie");

  if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.')

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id, 
      tittle: movie.title,
      dailyRetailRate: movie.dailyRetailRate,
    },
  })

  // try {
  //   new Fawn.Task()
  //     .save('rentals', rental)
  //     .update(
  //       'movies', 
  //       { _id: movie._id }, 
  //       { $inc: { numberInStock: -1 } })
  //     .run();
  // } catch (ex) {
    //   res.status(500).send('Smt failed...');
    // }
    rental = await rental.save();
    
    movie.numberInStock--;
    movie.save();
    
      res.send(rental)
});

// router.post('/', async function (req, res) {
  
// });

// router.put('/:id', async function (req, res) {
  
// });

// router.delete('/:id', async function (req, res) {
  
// });

module.exports = router