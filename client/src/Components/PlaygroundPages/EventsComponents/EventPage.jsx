import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../API/eventsApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RsvpIcon from "@mui/icons-material/Rsvp";

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const photoPath = "http://localhost:3000/api/events/getPhoto?fileName=";

  const topLevel = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        const formattedDate = new Date(response.date).toLocaleDateString(
          "en-US",
          { year: "numeric", month: "long", day: "numeric" }
        );
        const formattedTime = new Date(
          `1970-01-01T${response.time}`
        ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        setEvent({
          ...response,
          date: formattedDate,
          time: formattedTime,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  const imagePath = event.file.startsWith("http")
    ? event.file
    : photoPath + event.file;

  return (
    <>
      <div >
        <Button
          className="service"
          onClick={() => {
            navigate(`/playground`);
          }}
        >
          Back to Playground
        </Button>
      </div>
      <div style={{ maxWidth: "80%", display: "block", margin: "auto" }}>
      <div style={{ backgroundColor: "lightgrey", maxHeight: "400px", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius: "5px" }}>
        <img style={{ width: "600", height: "400px", display: "block", margin: "auto", borderRadius: "10px" }} src={imagePath} alt={event.title} />
        </div>
        <div style={topLevel}>
          <div>
          <h4>{event.date}</h4>
          </div>
          <div>
            <IconButton color="secondary" aria-label="favorite">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="rsvp">
              <RsvpIcon />
            </IconButton>
          </div>
        </div>
        <h2>{event.title} | {event.date} | {event.address} </h2>
        <h4>{event.description}</h4>
        <h2>Date and time</h2>
        <p> {event.date} | {event.time}</p>
        <h2>Location</h2>
        <p>Meet up at: {event.address}</p>
        <p>{event.event_type}</p>
        <p>{event.pet_type}</p>
      </div>
    </>
  );
};

export default EventPage;