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

export default function Age() {
    const [val, setVal] = useState(MIN);
    const handleChange2 = (_, newValue) => {
        setVal(newValue);
      };

    return (
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
)
}