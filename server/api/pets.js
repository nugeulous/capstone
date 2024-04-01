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
petsRouter.post('/addPet', async (req, res, next) => {
    try {
      const { name, animalType, breed, age, weight, image, gender, sterile, favoriteToy, favoriteTreat, personality, pet_owner_id } = req.body;

      const pet = await createPet({ name, animalType, breed, age, weight, image, gender, sterile, favoriteToy, favoriteTreat, personality, pet_owner_id });
  
      res.send({ pet });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  //Update Pet
  petsRouter.put('/:id', async (req, res, next) => {
    try {
        const petId = req.params.id;
        const { name, animalType, breed, age, weight, image, gender, favoriteToy, favoriteTreat, personality } = req.body;

        const updatedPet = await updatePet(petId, { name, animalType, breed, age, weight, image, gender, favoriteToy, favoriteTreat, personality });

        res.send({ pet: updatedPet });
    } catch (error) {
        next(error); 
    }
});

  module.exports = petsRouter;
