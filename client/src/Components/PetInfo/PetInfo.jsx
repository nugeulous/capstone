import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Sheet from "@mui/joy/Sheet";
import ImageUpload from "./ImageUpload";
import Age from "./Age";
import Weight from "./Weight";
import './GenderToggle.css'

export default function PetInfo({ setToken, age, setAge, weight, setWeight, image, setImage }) {
  const [name, setName] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [breed, setBreed] = useState("");
  const [animalType, setAnimalType] = useState("")
  const [favoriteToy, setFavoriteToy] = useState("");
  const [favoriteTreat, setFavoriteTreat] = useState("");
  const [personality, setPersonality] = useState("");

  const handleGenderChange = (gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setImage(null);
    setName("");
    setAge(0);
    setSelectedGender(null);
    setAnimalType("");
    setBreed("");
    setWeight("");
    setFavoriteToy("");
    setFavoriteTreat("");
    setPersonality("");
    if (!validateForm()) {
      return;
    }
    try {
      const result = await addPet(
        image,
        name,
        age,
        gender,
        breed,
        animalType,
        weight,
        favoriteToy,
        favoriteTreat,
        personality);
      setToken(result.token, result.user);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
      <Sheet component="form"
      noValidate
      onSubmit={handleSubmit}
      color="neutral" variant="soft">
        <div className="home">
          <h1>Tell us About your Pet</h1>
          <h2>Show us a Picture:</h2>
          <ImageUpload />
          <h2>Name:</h2>
          <TextField
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name 🐶"
            variant="outlined"
          />
          <h2>Gender:</h2>
          <div className="gender-toggle">
      <button
        id="male"
        className={`toggle-button ${selectedGender === 'male' ? 'active' : ''}`}
        onClick={() => handleGenderChange('male')}
      >
        Male
      </button>
      <button
        id="female"
        className={`toggle-button ${selectedGender === 'female' ? 'active' : ''}`}
        onClick={() => handleGenderChange('female')}
      >
        Female
      </button>
    </div>
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
          <h2>Animal Type:</h2>
          <Age />
          <h2>Animal Type:</h2>
          <TextField
            required
            id="outlined-basic"
            label="Animal Type 🐕"
            variant="outlined"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
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
            <Button type="submit" variant="outlined">Submit</Button>
          </div>
        </div>
      </Sheet>
  );
}
