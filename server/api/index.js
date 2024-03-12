// api/index.js
const express = require('express');
const apiRouter = express.Router();


const { getUserById } = require('../db');

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
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
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

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;