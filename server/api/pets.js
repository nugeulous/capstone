const express = require('express');
const petsRouter = express.Router();
const path = require('path'); 
const fs = require('fs');
const upload = require('./multerApi');

const { 
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  getPetsByOwnerId
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
petsRouter.post('/addPet', upload.single('file'), async (req, res, next) => {
    try {
      const { name, animalType, breed, age, weight, gender, sterile, favoriteToy, favoriteTreat, personality, ownerId } = req.body;
      const photoPath = req.file ? req.file.filename : null; 

      const pet = await createPet({ name, animalType, breed, age, weight, file: photoPath, gender, sterile, favoriteToy, favoriteTreat, personality, ownerId });
  
      res.send({ pet });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  petsRouter.get('/getPhoto', (req, res) => {
    const fileName = req.query.fileName;
    if (!fileName) {
      return res.status(400).send({ error: 'File name is required' });
    }
  
    const filePath = path.join(__dirname, `../public/uploads/${fileName}`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send({ error: 'File not found' });
    }
  
    res.sendFile(filePath);
  })

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

petsRouter.get('/owner/:ownerId', async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;
    const pets = await getPetsByOwnerId(ownerId);
    res.send(pets);
  } catch (error) {
    next(error); // Forward error to error handling middleware
  }
});


  //Update Pet
  petsRouter.put('/:id', async (req, res, next) => {
    try {
        const petId = req.params.id;
        const { name, animalType, breed, age, weight, file, gender, favoriteToy, favoriteTreat, personality} = req.body;

        const updatedPet = await updatePet(petId, { name, animalType, breed, age, weight, file, gender, favoriteToy, favoriteTreat, personality });

        res.send({ pet: updatedPet });
    } catch (error) {
        next(error); 
    }
});

  module.exports = petsRouter;
