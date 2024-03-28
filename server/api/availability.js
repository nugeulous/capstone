// ROUTERS
const express = require('express');
const availabilityRouter = express.Router();

const {  
    getAllAvailability, 
    getAvailablePetsitters
} = require('../db/index');

availabilityRouter.use((req, res, next) => {
  console.log('router is going!!');
  next();
});

// GET all availability assoc with petsitter ids
availabilityRouter.get('/', async (req, res, next) => {
  console.log('avail router....')  
  try {
      const availabilities = await getAllAvailability();
      res.send(availabilities);
    } catch (error) {
      
    } 
  });

// GET availability and petsitter info through table join
availabilityRouter.get('/petsitters', async (req, res, next) => {
  console.log('hit availabillity router')
  try {
    const sitter_availabilities = await getAvailablePetsitters();
      res.send(sitter_availabilities);
  } catch (error) {
      
  } 
});  
// //Create availability
// petsRouter.post('/', async (req, res, next) => {
//     try {
//       const { pet_name, pet_type, breed, age, weight } = req.body;

//       const pet = await createPet({ pet_name, pet_type, breed, age, weight });
  
//       res.send({ pet });
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   });

//   //Update Pet
//   petsRouter.put('/:id', async (req, res, next) => {
//     try {
//         const petId = req.params.id;
//         const { pet_name, pet_type, breed, age, weight } = req.body;

//         const updatedPet = await updatePet(petId, { pet_name, pet_type, breed, age, weight });

//         res.send({ pet: updatedPet });
//     } catch (error) {
//         next(error); 
//     }
// });

  module.exports = availabilityRouter;