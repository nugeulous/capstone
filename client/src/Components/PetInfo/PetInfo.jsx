import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Sheet from "@mui/joy/Sheet";
import ImageUpload from "./ImageUpload";
import Age from "./Age";
import Weight from "./Weight";

export default function PetInfo() {
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [favoriteToy, setFavoriteToy] = useState("");
  const [favoriteTreat, setFavoriteTreat] = useState("");
  const [personality, setPersonality] = useState("");
  return (
    <Box>
      <Sheet color="neutral" variant="soft">
        <div className="home">
          <h1>Tell us About your Pet</h1>
          <h2>Show us a Picture:</h2>
          <ImageUpload />
          <h2>Gender:</h2>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button value={gender} onClick={() => setGender(e.value.target)}>
                ♂ Male
              </Button>
              <Button value={gender} onClick={() => setGender(e.value.target)}>
                ♀ Female
              </Button>
            </ButtonGroup>
          </Box>
          <h2>Age:</h2>
          <Age />
          <h2>Breed:</h2>
          <TextField
            required
            id="outlined-basic"
            label="Breed 🐕"
            variant="outlined"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          <h2>Weight:</h2>
          <Weight />
          <h2>Favorite Toy:</h2>
          <TextField
            value={favoriteToy}
            onChange={(e) => setFavoriteToy(e.target.value)}
            id="outlined-basic"
            label="Toy 🎾"
            variant="outlined"
          />
          <h2>Favorite treat:</h2>
          <TextField
            value={favoriteTreat}
            onChange={(e) => setFavoriteTreat(e.target.value)}
            id="outlined-basic"
            label="treat 🦴"
            variant="outlined"
          />
          <h2>Personality:</h2>
          <TextField
            required
            sx={{ width: 500 }}
            id="outlined-multiline-static"
            label="Personality (ex. Likes to sniff, Chases squirrels, etc.)"
            multiline
            rows={5}
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
          />
          <div>
            <Button variant="outlined">Submit</Button>
          </div>
        </div>
      </Sheet>
    </Box>
  );
}
