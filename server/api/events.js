const express = require('express');
const eventsRouter = express.Router();
const path = require('path'); 
const fs = require('fs');
const upload = require('./multerApi');

const {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByOwnerId,
} = require('../db/index');

const { getOwnerById } = require('../db/owners');

//Create event
eventsRouter.post('/new-event', upload.single('file'), async (req, res, next) => {
  try {
    const { title, address, date, time, description, eventType, petType, userId } = req.body; 
    const photoPath = req.file ? req.file.filename : null; 

    const idUser = parseInt(userId);
    const userHasId = await getOwnerById(idUser);
    if (!userHasId) {
      return res.status(400).send({ error: 'User does not exist' })
    }
    const event = await createEvent({ title, address, date, time, file: photoPath, description, eventType, petType, userId: idUser });

    res.send({ event });
  } catch (error) {
    next(error);
  }
});

eventsRouter.get('/getPhoto', (req, res) => {
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
    next(error); 
  }
});

// Get events by Owner ID
eventsRouter.get('/owner/:userId', async (req, res, next) => { //needs updating
  try {
    const userId = req.params.userId; // needs updating
    const events = await getEventsByOwnerId(userId); // needs updating
    res.send(events);
  } catch (error) {
    next(error);
  }
});


module.exports = eventsRouter;
