import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../API/eventsApi";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./SlideShow.css";

const SlideShow = () => {
  const [slide, setSlide] = useState(0);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSlide((prevSlide) => (prevSlide === events.length - 1 ? 0 : prevSlide + 1));
      setIsTransitioning(false);
    }, 500); // Set the timeout to match the transition duration
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSlide((prevSlide) => (prevSlide === 0 ? events.length - 1 : prevSlide - 1));
      setIsTransitioning(false);
    }, 500); // Set the timeout to match the transition duration
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slide, events]);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`); // Use navigate function to navigate to the event page
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {events.map((event, idx) => (
        <div className="slide-container" key={idx}>
          <img
            src={event.file}
            className={`${slide === idx ? "slide" : "slide slide-hidden"} ${isTransitioning && slide === idx ? "slide-transitioning" : ""}`}
            alt={`Slide ${idx}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onClick={() => handleEventClick(event.id)}
          />
          <h1 className="slide-title">{event.title}</h1>
        </div>
      ))}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {events.map((_, idx) => (
          <button
            key={idx}
            className={slide === idx ? "indicator" : "indicator indicator-inactive"}
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default SlideShow;