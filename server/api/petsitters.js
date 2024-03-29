const express = require('express');
const petsittersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { requirePetsitter } = require("./utils");
const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;

const { 
  getAllPetsitters,
  getPetsitter, 
  createPetsitter,
  getPetsitterById,
  updatePetsitter
} = require('../db');

petsittersRouter.get('/', async (req, res, next) => {
    try {
      const petsitters = await getAllPetsitters();
      
      res.send(
        petsitters
      );
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  petsittersRouter.post("/register", async (req, res, next) => {
    try {
      const { email, password, fname, lname, address, phone, image, gender, dogs, cats, role } =
        req.body;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
      const petsitter = await createPetsitter({
        email,
        password: hashedPassword,
        fname,
        lname,
        address,
        phone,
        image,
        gender,
        dogs,
        cats,
        role
      });
      res.send({ petsitter });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  petsittersRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
  
    // request must have both
    if (!email && !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
    }
  
    try {
      const petsitter = await getPetsitter(email);
      if (!petsitter) {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      } else {
        const passwordMatch = await bcrypt.compare(password, petsitter.password);
        if (!passwordMatch) {
          next({
            name: "Incorrect Username Password Error",
            message: "Incorrect Username or Password",
          });
          return;
        }
        const token = jwt.sign({ id: petsitter.id, email, role: petsitter.role }, JWT_SECRET, {
          expiresIn: "1w",
        });
        res.send({ message: "you're logged in!", token });
      }
    } catch (error) {
      next(error);
    }
  });

  petsittersRouter.get('/me', requirePetsitter, async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      if (error.name === "PetsitterNotFoundError") {
        res.send(404).send({ message: error.message });
      } else {
        next(error);
      }
    }
  });

  petsittersRouter.put('/:id', async (req, res, next) => {
    try {
      const petsitters = await updatePetsitter();
  
      res.send({
        petsitters
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = petsittersRouter;
