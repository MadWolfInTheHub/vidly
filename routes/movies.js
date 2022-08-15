const { Movie, validate } = require('../modules/movie');
const mongoose = require('mongoose');

const express = require('express');
const { Genre } = require('../modules/genre');
const router = express.Router();

router.get('/', async function (req, res) {
  const movies = await Movie.find().sort('name');
  res.send(movies)
});

router.get('/:id', async function (req, res) {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

router.post('/', async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRetailRate: req.body.dailyRetailRate,
  });

  await movie.save();

  res.send(movie);
});

router.put('/:id', async function (req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRetailRate: req.body.dailyRetailRate,
  }, 
  {
    new: true,
  });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);

});

router.delete('/:id', async function (req, res) {

  const movie = await Movie.findByIdAndDelete(req.params.id);

  if(!movie) return res.status(404).send('The movie with the given ID was not found...');

  res.send(movie);
});

module.exports = router;