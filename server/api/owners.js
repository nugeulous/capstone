const express = require('express');
const ownersRouter = express.Router();

const { 
  createOwner,
  getAllOwners,
  getOwnerById
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

ownersRouter.post('/', async (req, res, next) => {
    try {
      const owners = await createOwner();
  
      res.send({
        owners
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  ownersRouter.get('/:id', async (req, res, next) => {
    try {
      const ownerId = req.params.id;
      const owner = await getOwnerById(ownerId);

      if (!owner) {
        res.status(404).send({ message: 'Owner not found' });
        return;
      }

      res.send({ owner });
    } catch (error) {
      next(error);
    }
  });

  module.exports = ownersRouter;
