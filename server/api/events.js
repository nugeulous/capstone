const express = require('express');
const eventsRouter = express.Router();
const multer = require('multer');
const path = require('path'); 
const fs = require('fs');

const {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByOwnerId,
} = require('../db/index');

const { getOwnerById } = require('../db/owners');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
  }
})

const upload = multer({ storage: storage })

//Create event
eventsRouter.post('/new-event', upload.single('file'), async (req, res, next) => {
  try {
    const { title, address, date, time, description, event_type, pet_type, owner_id } = req.body; 
    const photoPath = req.file ? req.file.filename : null; 
    // const ownerId = req.owner ? req.owner.id : null;
    const ownerId = parseInt(owner_id);
    const ownerHasId = await getOwnerById(ownerId);
    if (!ownerHasId) {
      return res.status(400).send({ error: 'Owner does not exist' })
    }
    const event = await createEvent({ title, address, date, time, file: photoPath, description, event_type, pet_type, owner_id: ownerId });

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
eventsRouter.get('/owner/:ownerId', async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;
    const events = await getEventsByOwnerId(ownerId);
    res.send(events);
  } catch (error) {
    next(error);
  }
});


module.exports = eventsRouter;
