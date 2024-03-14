const express = require('express');
const ownersRouter = express.Router();

const { 
  createOwner,
  getAllOwners,
  getOwnerById,
  updateOwner
} = require('../db/index');

ownersRouter.get('/', async (req, res, next) => {
    try {
      const owners = await getAllOwners();
      res.send(owners);
    } catch (error) {
      
    } 
  });

ownersRouter.post('/register', async (req, res, next) => {
    try {
      const { email, password, fname, lname, phone } = req.body;

      const owner = await createOwner({ email, password, fname, lname, phone});
  
      res.send(owner);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  ownersRouter.get('/:id', async (req, res, next) => {
    try {
      const ownerId = req.params.id;
      const owner = await getOwnerById(ownerId);

      res.send({ owner });
    } catch (error) {
      if (error.name === "OwnerNotFoundError") {
        res.send(404).send({ message: error.message });
      } else {
        next(error);
      }
    }
  });

  // update owners
  ownersRouter.put('/:id', async (req, res, next) => {
    try {
        const ownerId = req.params.id;
        const { email, password, fname, lname, location, phone, image, gender } = req.body;

        const updatedOwner = await updateOwner(ownerId, { email, password, fname, lname, location, phone, image, gender });

        res.send({ owner: updatedOwner });
    } catch (error) {
        next(error); 
    }
});

  module.exports = ownersRouter;
