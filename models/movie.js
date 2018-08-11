const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = require('../models/genre');



const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true
      //enum: ['Action', 'Horror', 'Romance']
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
  });
   
  const Movie = mongoose.model('movie', movieSchema);


  function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      genreId: Joi.objectId().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(movie, schema);
  }

  module.exports = {
      Movie,
      validateMovie  
  }