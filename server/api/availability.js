const express = require('express');
const availabilityRouter = express.Router();

const {  
    getAllAvailability, 
    getAvailablePetsitters,
    createAvailability
} = require('../db/index');

// middleware that helps with catching any errors along the way to next router
availabilityRouter.use((req, res, next) => {
  next();
});

// GET all availability assoc with petsitter ids
availabilityRouter.get('/', async (req, res, next) => {
  try {
      const availabilities = await getAllAvailability();
      res.send(availabilities);
    } catch (error) {
      console.log('ERROR------>', error)
      // next() triggers progrssing to next router but will be stopped if error
      next(error);
    } 
  });

// GET availability and petsitter info through table join - availability router = /availability; now adding on /petsitters
availabilityRouter.get('/petsitters', async (req, res, next) => {
  try {
    const sitter_availabilities = await getAvailablePetsitters();
      res.send(sitter_availabilities);
  } catch (error) {
      
  } 
});

// Create availability
availabilityRouter.post("/addavailability", async (req, res, next) => {
  try {
  const { petsitter_id, start_date, end_date, start_time, end_time } = req.body;
  
  const availability = await createAvailability({petsitter_id, start_date, end_date, start_time, end_time})

  res.send({availability})
  } catch (error){
    console.log(error);
  }
  
  })

  module.exports = availabilityRouter;