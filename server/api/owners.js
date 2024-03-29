require("dotenv").config();

const express = require("express");
const ownersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { requireOwner } = require("./utils");
const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;

const {
  createOwner,
  getAllOwners,
  getOwnerById,
  getOwner,
  updateOwner,
} = require("../db/index");

ownersRouter.get("/", async (req, res, next) => {
  try {
    const owners = await getAllOwners();
    res.send(owners);
  } catch (error) {}
});

ownersRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, fname, lname, address, phone, image, gender } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const owner = await createOwner({
      email,
      password: hashedPassword,
      fname,
      lname,
      address,
      phone,
      image,
      gender,
    });
    res.send({ owner });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ownersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // request must have both
  if (!email && !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const owner = await getOwner(email);
    if (!owner) {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, owner.password);
      if (!passwordMatch) {
        next({
          name: "Incorrect Username Password Error",
          message: "Incorrect Username or Password",
        });
        return;
      }
      const token = jwt.sign({ id: owner.id, email, role: owner.role }, JWT_SECRET, {
        expiresIn: "1w",
      });
      res.send({ message: "you're logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

// update owners
ownersRouter.put("/:id", async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const { email, password, fname, lname, address, phone, image, gender } =
      req.body;

    const updatedOwner = await updateOwner(ownerId, {
      email,
      password,
      fname,
      lname,
      address,
      phone,
      image,
      gender,
    });

    res.send({ owner: updatedOwner });
  } catch (error) {
    next(error);
  }
});

ownersRouter.get("/me", requireOwner, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    if (error.name === "OwnerNotFoundError") {
      res.send(404).send({ message: error.message });
    } else {
      next(error);
    }
  }
});

module.exports = ownersRouter;
