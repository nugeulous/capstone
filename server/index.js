const path = require('path')
const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const {client} = require("./db/client.js");
const { PORT = 8080 } = process.env;

console.log(__dirname);
console.log(`${__dirname}/public/uploads`);
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "dist")));

app.use('/events', express.static(path.join(__dirname, 'public/uploads')));

// allows us to host both back and front end simealtaneously once a dist folder.
// I suspect this will be important for deploying, but at the very least, it is more convenient for dev.  
// currently not working yet but also not breaking anything.
// watch 2310-Review-Fitness Tracker 1:04:24 for guidance
// https://youtu.be/NXILI_ttLR8?si=gx4cG1gbtikcppfN

app.use('/events', express.static(path.join(__dirname, 'dist')));

// base route
const apiRouter = require("./api");
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  client.connect()
  console.log('Server is listening on PORT: ' + PORT);
});
