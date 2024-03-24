import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../API/eventsApi";
import { useState, useEffect } from "react";
import EventsCard from "./EventsPages/EventsCard";

export default function Playground() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        setError(error.message);
      }
    };
    getEvents();
  }, []);

  return (
    <div className="home">
      <h1>Playground</h1>
      <Button
        onClick={() => {
          navigate(`/new-event`);
        }}
      >
        Add new Event
      </Button>
      <div className="events">
        {events.map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
