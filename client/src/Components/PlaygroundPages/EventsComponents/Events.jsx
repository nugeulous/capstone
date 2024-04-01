import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../../../API/eventsApi";
import { useState, useEffect } from "react";
import EventsCard from "./EventsCard";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventType, setEventType] = useState("");

  const searchFields = {
    display: "flex",
    justifyContent: "center",
    gap: 5,
  };
  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "18%",
    boxSizing: "border-box",
  };

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

  const handleReset = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setEventType("");
  };

  const eventTypes = [
    "Birthday",
    "Pet-freindly Picnic",
    "Yappy Hours",
    "Pet Parade",
    "Hike",
    "Training Workshop",
    "Pet Adoption",
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!startDate || new Date(event.date) >= new Date(startDate)) &&
      (!endDate || new Date(event.date) <= new Date(endDate)) &&
      (!eventType ||
        event.event_type.toLowerCase().includes(eventType.toLowerCase()))
  );

  return (
    <div className="home">
      <p>Hang out with Alltails users in local areas that
          provides a safe haven for your pets to engage in lively play sessions.</p>
      <div style={searchFields}>
        <Button
          onClick={() => {
            navigate(`/new-event`);
          }}
        >
          Add new Event
        </Button>
        <input
          type="text"
          placeholder="Search events"
          style={inputStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          style={inputStyle}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          style={inputStyle}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select
          value={eventType}
          style={inputStyle}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">All</option>
          {eventTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div className="events">
        {filteredEvents.length === 0 ? (
          <p>No events found. Please try another search.</p>
        ) : (
          filteredEvents.map((event) => (
            <EventsCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
