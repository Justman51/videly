let bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Joi = require('joi');




const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        unique: true,
        minlength: 8,
        maxlength: 1024
    }
});

const User = mongoose.model('User', userSchema);


function validateUser(rental) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().max(255).required().email(),
      password: Joi.string().min(8).max(255).required()
    };
  
    return Joi.validate(rental, schema);
  } 

  module.exports = {
      User,
      validateUser  
  }