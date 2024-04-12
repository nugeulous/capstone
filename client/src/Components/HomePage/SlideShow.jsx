import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../API/eventsApi";
import "./SlideShow.css";


const SlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
  };

  const goToPreviousSlide = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
        console.log(fetchedEvents)
      } catch (error) {
        setError(error.message);
      }
    };
    getEvents();
  }, []);

  return (
    <div className="slideshow-container">
      {events.map((event, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${event.file})`}}
        />
      ))}
      <button className="button" onClick={goToPreviousSlide}>Previous</button>
      <button className="button" onClick={goToNextSlide}>Next</button>
    </div>
  );
};
export default SlideShow;
