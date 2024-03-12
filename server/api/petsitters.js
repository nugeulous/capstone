const express = require('express');
const petsittersRouter = express.Router();

const { 
  getAllPetsitters, 
  createPetsitter,
  getPetsitterById,
  updatePetsitter
} = require('../db');

petsittersRouter.get('/', async (req, res, next) => {
    try {
      const petsitters = await getAllPetsitters();
      
      // by putting {owners} in brackets, creates an 
      // owners object with an array of objects with owner info
      res.send(
        petsitters
      );
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  petsittersRouter.post('/', async (req, res, next) => {
    try {
      const petsitters = await createPetsitter();
  
      res.send({
        petsitters
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  petsittersRouter.get('/:id', async (req, res, next) => {
    try {
      console.log('petsitters router id is working...')
      const petsitterId = req.params.id;
      console.log('petsitter id:', petsitterId)
      const petsitter = await getPetsitterById(petsitterId);
      
      console.log('petsitter: ', petsitter)
      if (!petsitter) {
        res.status(404).send({ message: 'Petsitter not found' });
        return;
      }

      res.send({ petsitter });
    } catch (error) {
      next(error);
    }
  });

  petsittersRouter.put('/:id', async (req, res, next) => {
    try {
      console.log('routing to petsitter...')
      const petsitters = await updatePetsitter();
  
      res.send({
        petsitters
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = petsittersRouter;
