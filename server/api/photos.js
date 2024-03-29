const express = require('express');
const photosRouter = express.Router();

console.log(__dirname)
photosRouter.post("/upload-by-file", async (req, res) => {
  try {
      const file = req.files.photo;
      const newName = "photo" + Date.now() + '.jpg';
      await file.mv(__dirname + newName); 
      res.json({ filename: newName });
  } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ error: "Failed to upload photo. Please try again later." });
  }
});

module.exports = photosRouter;
