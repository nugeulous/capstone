const express = require('express');
const petsRouter = express.Router();

const { 
  createPet,
  getAllPets,
  updatePet
} = require('../db/index');

// Get all Pets
petsRouter.get('/', async (req, res, next) => {
    try {
      const pets = await getAllPets();
      res.send(pets);
    } catch (error) {
      
    } 
  });

//Create Pet
petsRouter.post('/', async (req, res, next) => {
    try {
      const { pet_name, pet_type, breed, age, weight } = req.body;

      const pet = await createPet({ pet_name, pet_type, breed, age, weight });
  
      res.send({ pet });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  //Update Pet
  petsRouter.put('/:id', async (req, res, next) => {
    try {
        const petId = req.params.id;
        const { pet_name, pet_type, breed, age, weight } = req.body;

        const updatedPet = await updatePet(petId, { pet_name, pet_type, breed, age, weight });

        res.send({ pet: updatedPet });
    } catch (error) {
        next(error); 
    }
});

  module.exports = petsRouter;
