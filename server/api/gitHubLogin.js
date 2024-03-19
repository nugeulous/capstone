require('dotenv').config()

const express = require('express');
const ownersRouter = express.Router();
const jwt = require('jsonwebtoken')
const { requireUser } = require('./utils');
const { JWT_SECRET } = process.env;

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