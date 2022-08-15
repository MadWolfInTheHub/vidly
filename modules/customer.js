const Joi = require('joi');
const mongoose = require('mongoose');

const validateCustomer = (customer) => {
  const schema = Joi.object({ 
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(8).max(12).required(),
    isGold: Joi.boolean()
  }); 
  return schema.validate(customer);
}

const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 12,
  },
}));

exports.Customer = Customer;
exports.validate = validateCustomer;