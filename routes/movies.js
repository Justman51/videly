const{Movie, validateMovie } = require('../models/movie');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

  
  router.get('/', async (req, res) => {
   const movie = await Movie.find().sort('title');
    res.send(movie);
  });
  
  router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');
  
    let movie = new Movie({ 
      title: req.body.title, 
      genre: {
          _id: genre._id,
          name: genre.name
      }, 
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    
    // {
    //   id: genres.length + 1,
    //   name: req.body.name
    // };
    //genres.push(movie);
    movie =  await movie.save();
    res.send(movie);
  });
  
  router.put('/:id', async (req, res) => {
  
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const movie = await Movie.update({_id: req.params.id}, 
        {
            $set: {
                'title': req.body.title,
                'genre.name': req.body.genre,
                'numberInStock': req.body.numberInStock,
                'dailyRentalRate': req.body.dailyRentalRate
            }
        }
        );
    
    //genres.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    //movie.name = req.body.name; 
    //movie.save();
    res.send(movie);
  });
  
  router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    //genres.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    // const index = genres.indexOf(movie);
    // genres.splice(index, 1);
  
    res.send(movie);
  });
  
  router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    //genres.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
  });
  
  
  
  module.exports = router;