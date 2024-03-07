const express = require('express');
const ownersRouter = express.Router();

const { 
  createOwner,
  getAllOwners
  // getOwnerById
} = require('../db');

ownersRouter.get('/', async (req, res, next) => {
    try {
      const owners = await getAllOwners();
  
      res.send({
        owners
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = ownersRouter;