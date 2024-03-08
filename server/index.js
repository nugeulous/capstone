const path = require('path')
const express = require('express');
const app = express();
const cors = require('cors');
const {client} = require("./db")
require("dotenv").config();

const PORT = 8080;

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "client/dist")));

const apiRouter = require("./api");
app.use("/api", apiRouter);

app.listen(PORT, () => {
  client.connect();
  console.log('Server is listening on PORT: ' + PORT);
});
