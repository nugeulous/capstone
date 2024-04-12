import React, { useState, useEffect } from "react";
import Events from "./EventsComponents/Events";
import Blog from "./BlogComponents/Blog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import "../../App.css";

export default function Playground({ user }) {
  const [showEvents, setShowEvents] = useState(true);

  useEffect(() => {
    const showEventsState = localStorage.getItem("showEvents");
    if (showEventsState !== null) {
      setShowEvents(showEventsState === "true");
    }
  }, []);

  const handleToggleEvents = () => {
    setShowEvents(true);
    localStorage.setItem("showEvents", "true");
  };

  const handleToggleBlog = () => {
    setShowEvents(false);
    localStorage.setItem("showEvents", "false");

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

      {showEvents ? <Events /> : <Blog user={user} />}
    </div>
  );
}
