require('dotenv').config()

const express = require('express');
const ownersRouter = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { requireUser } = require('./utils');
// const { JWT_SECRET } = process.env;

const { 
  createOwner,
  getAllOwners,
  getOwnerById,
  getOwnerByEmail,
  getOwner
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
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const { email, password, fname, lname, location, phone, image, gender } = req.body;
      // Extract necessary properties from the request body

      const owner = await createOwner({ email, password: hashedPassword, fname, lname, location, phone, image, gender });  
      res.send({ owner });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  ownersRouter.post('/login', async (req, res, next) => {
    const { email } = req.body;

    // request must have both
  if (!email) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password'
    });
  }

    try {
        const owner = await getOwner(email);
        if (!owner) {
          next({
            name: 'IncorrectCredentialsError',
            message: 'Username or password is incorrect',
          })
        } else {
          console.log(owner)
          const token = jwt.sign({id: owner.id, email}, process.env.JWT_SECRET, { expiresIn: '1w', });
          console.log(token)
          res.send({ message: "you're logged in!", token,  });
        } 
      
    } catch (error) {
        next(error);
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
