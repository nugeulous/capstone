import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

export default function Weight() {
    const [weight, setWeight] = useState("");

    const handleChange = (event) => {
      setWeight(event.target.value);
    };
    return (
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
  );
}
