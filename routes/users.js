const config = require('config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const{User, validateUser} = require('../models/user');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

  
//   router.get('/', async (req, res) => {
//    const user = await User.find().sort('name');
//     res.send(user);
//   });
  
  router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

let user =  await User.findOne({email: req.body.email});
  //console.log(user);
  if(user) return res.status(400).send('User already registered.');
    //const saltRounds = 10;
     user = new User(_.pick(req.body, ['name', 'email', 'password']));
     const  salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
  await user.save();

     const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
   res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
  });

  // router.post('/', async (req, res) => {
  //   const { error } = validateUser(req.body); 
  //   if (error) return res.status(400).send(error.details[0].message);
  
  //   let user = await User.findOne({ email: req.body.email });
  //   if (user) return res.status(400).send('User already registered.');
  
  //   user = new User(_.pick(req.body, ['name', 'email', 'password']));
  //   const salt = await bcrypt.genSalt(10);
  //   user.password = await bcrypt.hash(user.password, salt);
  //   await user.save();
  
  //   const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
  //   res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  // });
  
  module.exports = router; 
  
  
//   router.put('/:id', async (req, res) => {
  
//     const { error } = validateUser(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);
  
//     const user = await User.findByIdAndUpdate(req.params.id, 
//       {
//         name:req.body.name, 
//         email: req.body.email, 
//         password: req.body.password
//       }, 
//       {
//      new: true
//     });
    
//     //genres.find(c => c.id === parseInt(req.params.id));
//     if (!user) return res.status(404).send('The user with the given ID was not found.');
//     //user.name = req.body.name; 
//     //user.save();
//     res.send(user);
//   });
  
//   router.delete('/:id', async (req, res) => {
//     const user = await User.findByIdAndRemove(req.params.id);
//     //genres.find(c => c.id === parseInt(req.params.id));
//     if (!user) return res.status(404).send('The user with the given ID was not found.');
  
//     // const index = genres.indexOf(user);
//     // genres.splice(index, 1);
  
//     res.send(user);
//   });
  
//   router.get('/:id', async (req, res) => {
//     const user = await User.findById(req.params.id)
//     //genres.find(c => c.id === parseInt(req.params.id));
//     if (!user) return res.status(404).send('The user with the given ID was not found.');
//     res.send(user);
//   });
  
  
  
  module.exports = router;