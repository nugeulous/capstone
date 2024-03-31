import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../API/eventsApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        const formattedDate = new Date(response.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = new Date(`1970-01-01T${response.time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        setEvent({
          ...response,
          date: formattedDate,
          time: formattedTime
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

  return (
    <>
      <div>
        <Button
          className="service"
          onClick={() => {
            navigate(`/playground`);
          }}
        >
          Back to Playground
        </Button>
      </div>
      <div>
        <img src={event.file} alt={event.title} />
        <h2>{event.title}</h2>
        <p>{event.address}</p>
        <p>{event.date}</p>
        <p>{event.time}</p>
        <p>{event.description}</p>
        <p>{event.event_type}</p>
        <p>{event.pet_type}</p>
      </div>
    </>
  );
};

export default EventPage;
