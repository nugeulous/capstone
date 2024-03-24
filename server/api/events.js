const express = require('express');
const eventsRouter = express.Router();

const { 
  createEvent,
  getAllEvents,
} = require('../db/index');

// Get all events
eventsRouter.get('/', async (req, res, next) => {
    try {
      const events = await getAllEvents();
      res.send(events);
    } catch (error) {
      
    } 
  });

//Create event
eventsRouter.post('/new-event', async (req, res, next) => {
    try {
      const { title, address, date, time, photos, description, event_type, pet_type, owner_id } = req.body;
      // const owner_id = req.user.id

      const event = await createEvent({ title, address, date, time, photos, description, event_type, pet_type, owner_id });
  
      res.send({event});
    } catch (error) {
      next(error);
    }
  });

  module.exports = eventsRouter;
