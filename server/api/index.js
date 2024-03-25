// api/index.js
const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getOwnerById } = require('../db/owners');

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
      console.log(parseToken, "hello id jwt");
      if (id) {
        req.user = await getOwnerById(id);
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
const availabilityRouter = require('./availability');
apiRouter.use('/availability', availabilityRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;