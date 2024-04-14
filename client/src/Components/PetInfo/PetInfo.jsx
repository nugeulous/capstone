import { useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Sheet from "@mui/joy/Sheet";
import Age from "./Age";
import Weight from "./Weight";
import "./PetInfo.css"
import NoAccess from "../PlaygroundPages/EventsComponents/NoAccess";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
export default function PetInfo({ user }) {
  const [pet, setPet] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [sterile, setSterile] = useState("Yes");
  const [animalType, setAnimalType] = useState("")
  const [favoriteToy, setFavoriteToy] = useState("");
  const [favoriteTreat, setFavoriteTreat] = useState("");
  const [personality, setPersonality] = useState("");
  const [ownerId, setOwnerId] = useState("")
  const [error, setError] = useState(null);
  
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleChange = (event) => {
    setSterile(event.target.value);
  };
 
  const handleSubmit = async (event, ownerId) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("breed", breed);
      formData.append("animalType", animalType);
      formData.append("weight", weight);
      formData.append("file", file);
      formData.append("sterile", sterile);
      formData.append("favoriteToy", favoriteToy);
      formData.append("favoriteTreat", favoriteTreat);
      formData.append("personality", personality);
      formData.append("ownerId", ownerId);
      const response = await axios.post(`${API_URL}/pets/addPet`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 
      console.log(response.data);
      console.log(ownerId)
      setName("");
      setAge(0);
      setGender(null);
      setBreed("");
      setAnimalType("");
      setWeight("");
      setFile(null);
      setSterile("");
      setFavoriteToy("");
      setFavoriteTreat("");
      setPersonality("");
      setOwnerId("")
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };
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
      onSubmit={(e) => handleSubmit(e, user.id)}
      color="neutral"
      variant="soft"
    >
      <div className="home">
        <h1>Tell us About your Pet</h1>
        <h2>Show us a Picture:</h2>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
            {file && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: 100,
                  height: 100,
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded photo`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "inherit",
                    borderRadius: 20,
                  }}
                />
              </div>
            )}
         <h2>Name:</h2>
        <TextField
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="outlined-basic"
          label="Name"
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
          label="Breed"
          variant="outlined"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <h2>Animal Type:</h2>
        <TextField
            required
            id="outlined-basic"
            label="Animal Type"
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
          label="Toy"
          variant="outlined"
        />
        <h2>Favorite treat:</h2>
        <TextField
          value={favoriteTreat}
          onChange={(e) => setFavoriteTreat(e.target.value)}
          id="outlined-basic"
          label="treat"
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