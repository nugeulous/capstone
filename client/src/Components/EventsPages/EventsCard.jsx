import React from 'react';
import { Link } from 'react-router-dom';

const EventsCard = ({ event }) => {
  const photoPath = 'http://localhost:3000/api/events/getPhoto?fileName='
  const imagePath = event.file.startsWith('http') ? event.file : photoPath + event.file;

  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(`${event.date} ${event.time}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="event-card">
      <Link to={`/events/${event.id}`}>
        <img className="event-image" src={imagePath} alt={event.title} />
        <div className="event-details">
          <h2>{event.title}</h2>
          <p>{event.address}</p>
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
      </Link>
    </div>
  );
};

export default EventsCard;
