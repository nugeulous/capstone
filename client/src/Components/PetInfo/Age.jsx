import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

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

export default function Age({ age, setAge }) {
    const handleChange2 = (_, newValue) => {
        setAge(newValue);
      };

    return (
      <Box sx={{ width: 300, margin: "0 auto" }}>
    <Slider
      marks={marks}
      step={1}
      value={age}
      valueLabelDisplay="on"
      min={MIN}
      max={MAX}
      onChange={handleChange2}
    />
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography
        variant="body2"
        onClick={() => setAge(MIN)}
        sx={{ cursor: "pointer" }}
      >
        {MIN}
      </Typography>
      <Typography
        variant="body2"
        onClick={() => setAge(MAX)}
        sx={{ cursor: "pointer" }}
      >
        {MAX}
      </Typography>
    </Box>
  </Box>
)
}