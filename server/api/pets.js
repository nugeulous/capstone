const express = require("express");
const petsRouter = express.Router();

const { getAllPets } = require("../db/index");

petsRouter.get("/", async (req, res, next) => {
  try {
    const pets = await getAllPets();
    res.send(pets);
  } catch (error) {
    //   next (error)
  }
});

module.exports = petsRouter;
