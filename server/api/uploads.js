const express = require('express');
const uploadsRouter = express.Router();
const imageDownloader = require('image-downloader');

uploadsRouter.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName)
});

module.exports = uploadsRouter;
