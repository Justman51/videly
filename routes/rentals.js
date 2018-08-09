const{Rental, validateRental } = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer')
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

  
  router.get('/', async (req, res) => {
   const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
  });
  
  router.post('/', async (req, res) => {
    const { error } = validateRental(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer.');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Customer.');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.')
  
    let rental = new Rental({ 
      customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone
      },
      movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
      }
    });
    
    // {
    //   id: genres.length + 1,
    //   name: req.body.name
    // };
    //genres.push(movie);
    rental =  await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
  });
  
//   router.put('/:id', async (req, res) => {
  
//     const { error } = validateRental(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);
  
//     const movie = await Movie.update({_id: req.params.id}, 
//         {
//             $set: {
//                 'title': req.body.title,
//                 'genre.name': req.body.genre,
//                 'numberInStock': req.body.numberInStock,
//                 'dailyRentalRate': req.body.dailyRentalRate
//             }
//         }
//         );
    
//     //genres.find(c => c.id === parseInt(req.params.id));
//     if (!movie) return res.status(404).send('The movie with the given ID was not found.');
//     //movie.name = req.body.name; 
//     //movie.save();
//     res.send(movie);
//   });
  
//   router.delete('/:id', async (req, res) => {
//     const movie = await Movie.findByIdAndRemove(req.params.id);
//     //genres.find(c => c.id === parseInt(req.params.id));
//     if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
//     // const index = genres.indexOf(movie);
//     // genres.splice(index, 1);
  
//     res.send(movie);
//   });
  
//   router.get('/:id', async (req, res) => {
//     const movie = await Movie.findById(req.params.id)
//     //genres.find(c => c.id === parseInt(req.params.id));
//     if (!movie) return res.status(404).send('The movie with the given ID was not found.');
//     res.send(movie);
//   });
  
  
  
  module.exports = router;