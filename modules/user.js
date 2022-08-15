const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');

const complexityOptions = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  isAdmin: Boolean,
  // roles: []
  // operations: []
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
  return token;
};


const User = mongoose.model( 'User', userSchema);

const validateUser = (user) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: passwordComplexity(complexityOptions),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;