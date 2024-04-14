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
    const { email, password, fname, lname, address, phone, file, gender } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const owner = await createOwner({
      email,
      password: hashedPassword,
      fname,
      lname,
      address,
      phone,
      file,
      gender,
    });
    const token = jwt.sign({ id: owner.id, email, role: owner.role, owner }, JWT_SECRET, {
      expiresIn: "8h",
    });
    res.send({ owner, token });
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
      delete owner.password;
      const token = jwt.sign({ id: owner.id, email, role: owner.role, owner }, JWT_SECRET, {
        expiresIn: "8h",
      });
      res.send({ message: "you're logged in!", token, role: owner.role, id: owner.id, owner });
    }
  } catch (error) {
    next(error);
  }
});

// update owners
ownersRouter.put("/:id", async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const { email, password, fname, lname, address, phone, file, gender } =
      req.body;

    const updatedOwner = await updateOwner(ownerId, {
      email,
      password,
      fname,
      lname,
      address,
      phone,
      file,
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

ownersRouter.get('/:ownerId', async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;
    const owner = await getOwnerById(ownerId);

    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.json(owner);
  } catch (error) {
    next(error);
  }
});

module.exports = ownersRouter;
