import { useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Sheet from "@mui/joy/Sheet";
import ImageUpload from "./ImageUpload";
import Age from "./Age";
import Weight from "./Weight";
import { addPet } from "../../API/api";
import "./PetInfo.css"
import NoAccess from "../PlaygroundPages/EventsComponents/NoAccess";

export default function PetInfo({ user }) {
  const [pet, setPet] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [sterile, setSterile] = useState("Yes");
  const [animalType, setAnimalType] = useState("")
  const [favoriteToy, setFavoriteToy] = useState("");
  const [favoriteTreat, setFavoriteTreat] = useState("");
  const [personality, setPersonality] = useState("");
  const [error, setError] = useState(null);
  

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleChange = (event) => {
    setSterile(event.target.value);
  };
 
  async function handleSubmit(event) {
    event.preventDefault();
    setImage(null);
    setName("");
    setAge(0);
    setGender(null);
    setAnimalType("");
    setBreed("");
    setWeight("");
    setSterile("");
    setFavoriteToy("");
    setFavoriteTreat("");
    setPersonality("");
   
    try {
      const result = await addPet({
        image,
        name,
        age,
        gender,
        breed,
        animalType,
        weight,
        sterile,
        favoriteToy,
        favoriteTreat,
        personality,
        ownerId: user.id }
      );
      setPet(result.pet);
      console.log(result.pet);
      navigate
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  if (!user) {
    return <NoAccess/>
  } else if (user.role !== "owner") {
    return <p>Must be signed in as an owner to access this page</p>
  };
  return (
    <>
    <Sheet className="PetDisplay"
      component="form"
      noValidate
      onSubmit={handleSubmit}
      color="neutral"
      variant="soft"
    >
      <div className="home">
        <h1>Tell us About your Pet</h1>
        <h2>Show us a Picture:</h2>
        <ImageUpload image={image} setImage={setImage} />
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
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <h2>Age:</h2>
        <Age age={age} setAge={setAge} />
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
        <TextField
            required
            id="outlined-basic"
            label="Animal Type 🐕"
            variant="outlined"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
          />         
        <h2>Weight:</h2>
        <Weight weight={weight} setWeight={setWeight} />
        <h2>Neutered/Spayed:</h2>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={sterile}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
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
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </div>
      </div>
    </Sheet>
    </>
  );
}
