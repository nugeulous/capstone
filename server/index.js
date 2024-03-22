const path = require('path')
const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const {client} = require("./db/client.js");
const { PORT = 8080 } = process.env;

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "client/dist")));


const apiRouter = require("./api");
app.use("/api", apiRouter);

app.listen(PORT, () => {
  client.connect()
  console.log('Server is listening on PORT: ' + PORT);
});
