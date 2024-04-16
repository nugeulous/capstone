import React, { useState, useEffect } from "react";
import { getAllLikedEventsByUser } from "../../API/eventsApi";

const LikedEvents = ({ user }) => {
  const [likedEvents, setLikedEvents] = useState([]);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        if (user && user.id) {
          const userId = user.id;
          const events = await getAllLikedEventsByUser(userId);
          setLikedEvents(events);
        }
      } catch (error) {
        console.error("Error fetching liked events:", error);
      }
    };

    fetchLikedEvents();
  }, [user]);

  const eventStyle = {
    border: '5px solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px 0', 
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Liked Events</h2>
      <div style={{ margin: '0 auto', maxWidth: '600px' }}>
        {likedEvents.map((event) => (
          <div key={event.id} style={eventStyle}>
            <h2>{event.title}</h2>
            <h3>{event.date}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedEvents;

