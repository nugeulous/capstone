const express = require('express');
const petsRouter = express.Router();

const { 
  createPet,
  getAllPets,
  getPetById,
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

  // Get pet by ID
petsRouter.get('/:eventId', async (req, res, next) => {
  try {
    const petId = req.params.petId;
    const pet = await getPetById(petId);
    if (!pet) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.send(pet);
  } catch (error) {
    next(error); // Forward error to error handling middleware
  }
});


  //Update Pet
  petsRouter.put('/:id', async (req, res, next) => {
    try {
        const petId = req.params.id;
        const { name, animalType, breed, age, weight, image, gender, favoriteToy, favoriteTreat, personality} = req.body;

        const updatedPet = await updatePet(petId, { name, animalType, breed, age, weight, image, gender, favoriteToy, favoriteTreat, personality });

        res.send({ pet: updatedPet });
    } catch (error) {
        next(error); 
    }
});

  module.exports = petsRouter;
