import React from 'react'
import { Link } from "react-router-dom";

const EventsCard = ({ event }) => {
  return (
    <div className="event-card">
      <Link to={`/events/${event.id}`}>
        <img className="event-image" src={event.photo} alt={event.title} />
        <div className="event-details">
          <h2>{event.title}</h2>
          <p>{event.address}</p>
          <p>{event.date}</p>
        </div>
      </Link>
    </div>
  )
}

export default EventsCard;