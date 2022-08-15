const Joi = require('joi'); // Joi package is used to perform input validation.

const mongoose = require('mongoose');

// Api array

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  }
});

const Genre = mongoose.model('Genre', genreSchema);

// Validation

const validateGenre = (genre) => {
  console.log(genre)
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;