const express = require('express');
const eventsRouter = express.Router();
const multer = require('multer');
const path = require('path'); 

const {
  createEvent,
  getAllEvents,
  getEventById
} = require('../db/index');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

//Create event
eventsRouter.post('/new-event', upload.single('file'), async (req, res, next) => {
  try {
    const { title, address, date, time, description, event_type, pet_type } = req.body;
    const photoPath = req.file ? req.file.path : null; 
    const event = await createEvent({ title, address, date, time, file: photoPath, description, event_type, pet_type });

    res.send({ event });
  } catch (error) {
    next(error);
  }
});

// Get all events
eventsRouter.get('/', async (req, res, next) => {
  try {
    const events = await getAllEvents();
    res.send(events);
  } catch (error) {

  }
});

// Get event by ID
eventsRouter.get('/:eventId', async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const event = await getEventById(eventId);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.send(event);
  } catch (error) {
    next(error); // Forward error to error handling middleware
  }
});


module.exports = eventsRouter;
