import React from 'react';
import { Link } from 'react-router-dom';

const EventsCard = ({ event }) => {

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

  const photoPath = `${API_URL}/events/getPhoto?fileName=`

  const imagePath = event?.file && event.file.startsWith('http') 
  ? event.file 
  : photoPath + (event?.file || '');

  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [hours, minutes] = event.time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const roundedMinutes = Math.round(minutes / 30) * 30;
  const formattedTime = `${formattedHours}:${roundedMinutes.toString().padStart(2, '0')} ${ampm}`;


  return (
    <div className="event-card">
      <Link to={`/events/${event.id}`}>
        <div className="event-details">
          <h2>{event.title}</h2>
          <img className="event-image" src={imagePath} alt={event.title} />
          <p>{event.address}</p>
          <p>{formattedDate} {formattedTime}</p>
        </div>
      </Link>
    </div>
  );
};

export default EventsCard;
