// Express.js server set up with some middleware and config for backend API routes + static files for a frontend
const path = require('path')
// express to create web server
const express = require('express');
//  app instance to config middleware + routes
const app = express();
// cors enables server to accept requests from diff domains (ports)
const cors = require('cors');
//  loads environment variables from a .env file
require("dotenv").config();
// db instance
const {client} = require("./db/client.js");
// set server port
const { PORT = 8080 } = process.env;

// apps for managing image uploads
console.log(__dirname);
console.log(`${__dirname}/public/uploads`);
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "client/dist")));
app.use('/events', express.static(path.join(__dirname, 'public/uploads')));
app.use('/events', express.static(path.join(__dirname, 'dist')));

// base router for requests
const apiRouter = require("./api");
app.use("/api", apiRouter);

// server-side error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  client.connect()
  console.log('Server is listening on PORT: ' + PORT);
});












// OLD / DELETE?
// allows us to host both back and front end simultaneously once a dist folder.
// I suspect this will be important for deploying, but at the very least, it is more convenient for dev.  
// currently not working yet but also not breaking anything.
// watch 2310-Review-Fitness Tracker 1:04:24 for guidance
// https://youtu.be/NXILI_ttLR8?si=gx4cG1gbtikcppfN