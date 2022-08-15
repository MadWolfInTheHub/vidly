
const { Genre, validate } = require('../modules/genre'); 
const mongoose = require('mongoose');
const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin.js');
const express = require('express');
const router = express.Router();

// GET request (all genres)

router.get('/', async (req, res) => {
  // throw new Error('Could not get genres');

  const genres = await Genre.find().sort('name');
  res.send(genres);    
});

// Get request (specific genre by id)

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  // const genre = genres[req.params.id]
  if(!genre) return res.status(404).send('Genre not found!!!')

  res.send(genre);
});


// Post request

router.post('/', auth, async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name, })
  await genre.save()

  res.send(genre);
});

// PUT request

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name, new: true })

  // const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('Genre is not found...');

  res.send(genre);
});

// DELETE request

router.delete('/:id', [auth, admin], async  (req, res) => {
  // const { error } = validate(req.body.name);
  // if(error) return res.status(404).send(error.details[0].message)

  const genre = await Genre.findByIdAndRemove(req.params.id)
  // const genre = genres.find(g => g.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('Genre not found!!!');

  // const index = genres.indexOf(genre)
  // genres.splice(index, 1)

  res.send(genre);
});

module.exports = router;
