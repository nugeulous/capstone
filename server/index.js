const path = require('path')
const express = require('express');
const app = express();
const cors = require('cors');
const client = require("./db");

const PORT = 8080;

//routes
const ownersRouter = require('./api');
server.use('/api', ownersRouter);

// middleware
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.listen(PORT, () => {
  console.log('Server is listening on PORT: ' + PORT);
});
