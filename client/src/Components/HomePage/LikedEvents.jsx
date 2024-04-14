import React from "react";
import { useState, useEffect } from "react";
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

  return (
    <div>
      <h2>Liked Events</h2>
      <ul>
        {likedEvents.map((event) => (
          <div key={event.id}>
            <h3>{event.title}</h3>
            <h6>{event.date}</h6>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LikedEvents;
