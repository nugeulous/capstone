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
app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.use('/events', express.static(path.join(__dirname, 'public/uploads')));

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
