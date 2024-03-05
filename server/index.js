const path = require('path')
const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();

const PORT = 3000;

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.listen(PORT, () => {
  console.log('Server is listening on PORT: ' + PORT);
});
