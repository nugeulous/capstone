import React, { useState } from "react";
import Events from "./EventsComponents/Events";
import Blog from "./BlogComponents/Blog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import "../../App.css";

export default function Playground() {
  const [showEvents, setShowEvents] = useState(true);

  const handleToggleEvents = () => {
    setShowEvents(true);
  };

  const handleToggleBlog = () => {
    setShowEvents(false);
  };

  return (
    <div className="home">
      <h1>Playground</h1>

      <div className="toggle-buttons">
        <Stack direction="row" spacing={2}>
          <Button
            variant={showEvents ? "contained" : "outlined"}
            onClick={handleToggleEvents}
            sx={{
              backgroundColor: showEvents ? "#007bff" : "transparent",
              color: showEvents ? "#fff" : "#007bff",
            }}
          >
            Show Events
          </Button>
          <Button
            variant={!showEvents ? "contained" : "outlined"}
            onClick={handleToggleBlog}
            sx={{
              backgroundColor: !showEvents ? "#007bff" : "transparent",
              color: !showEvents ? "#fff" : "#007bff",
            }}
          >
            Show Blog
          </Button>
        </Stack>
      </div>

      {showEvents ? <Events /> : <Blog />}
    </div>
  );
}
