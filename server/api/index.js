// api/index.js
const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getOwnerById } = require('../db/owners');
const { getPetsitterById} = require('../db/petsitters');

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const parseToken = jwt.verify(token, JWT_SECRET);
      const id = parseToken && parseToken.id;
      if (id) {
        let user;
        const isOwner = parseToken.role === 'owner';
        if (isOwner) {
          user = await getOwnerById(id);
        } else {
          user = await getPetsitterById(id);
        }
        res.json(user);
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }

  next();
});

// ROUTER: /api/owners
const ownersRouter = require('./owners');
apiRouter.use('/owners', ownersRouter);

// ROUTER: /api/pets
const petsRouter = require('./pets');
apiRouter.use('/pets', petsRouter);

// ROUTER: /api/petsitters
const petsitterRouter = require('./petsitters');
apiRouter.use('/petsitters', petsitterRouter);

// ROUTER: /api/availability
  // goal: indicate availability/:petsitter_id
const availabilityRouter = require('./availability');
apiRouter.use('/availability', availabilityRouter);

// ROUTER: /api/events
const eventsRouter = require('./events');
apiRouter.use('/events', eventsRouter);

// ROUTER: /api/uploads
const photosRouter = require('./photos');
apiRouter.use('/photos', photosRouter);

// ROUTER: /api/orders
const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

// ROUTER: return error message if error hits in conditional
apiRouter.use((error, req, res, next) => {
  // TODO: proper error handling to send back to client - not showing up on client side
  console.log('ERROR--->', error)
  res.send(error);
});

module.exports = apiRouter;