import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Sheet from "@mui/joy/Sheet";
import ImageUpload from "./ImageUpload";

const MAX = 25;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

export default function PetInfo() {
  const [val, setVal] = useState(MIN);
  const [weight, setWeight] = useState("");

  const handleChange = (event) => {
    setWeight(event.target.value);
  };
  const handleChange2 = (_, newValue) => {
    setVal(newValue);
  };
  return (
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
            <Button>♂ Male</Button>
            <Button>♀ Female</Button>
          </ButtonGroup>
        </Box>
        <h2>Age:</h2>
        <Box sx={{ width: 300, left: "1000px" }}>
          <Slider
            marks={marks}
            step={1}
            value={val}
            valueLabelDisplay="on"
            min={MIN}
            max={MAX}
            onChange={handleChange2}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="body2"
              onClick={() => setVal(MIN)}
              sx={{ cursor: "pointer" }}
            >
              {MIN}
            </Typography>
            <Typography
              variant="body2"
              onClick={() => setVal(MAX)}
              sx={{ cursor: "pointer" }}
            >
              {MAX}
            </Typography>
          </Box>
        </Box>
        <h2>Breed:</h2>
        <TextField required id="outlined-basic" label="Breed 🐕" variant="outlined" />
        <h2>Weight:</h2>
        <Box sx={{ maxWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Weight</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={weight}
              label="weight"
              onChange={handleChange}
            >
              <MenuItem value={"Small"}>S: 5-20 lb</MenuItem>
              <MenuItem value={"Medium"}>M: 21-50 lb</MenuItem>
              <MenuItem value={"Large"}>L: 51- 99 lb</MenuItem>
              <MenuItem value={"X-Large"}>XL: 100+ lb</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <h2>Favorite Toy:</h2>
        <TextField required id="outlined-basic" label="toy 🎾" variant="outlined" />
        <h2>Favorite treat:</h2>
        <TextField id="outlined-basic" label="treat 🦴" variant="outlined" />
        <h2>Personality:</h2>
        <TextField
          sx={{ width: 500 }}
          id="outlined-multiline-static"
          label="Personality (ex. Likes to sniff, Chases squirrels, etc.)"
          multiline
          rows={5}
        />
        <div>
          <Button variant="outlined">Submit</Button>
        </div>
      </div>
    </Sheet>
  );
}
