import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../API/eventsApi";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./SlideShow.css";


const SlideShow = () => {
  const [slide, setSlide] = useState(0);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const nextSlide = () => {
    setSlide(slide === events.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? events.length - 1 : slide - 1);
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // Change 3000 to the desired interval in milliseconds

    // Return a cleanup function to reset slide to 0 when it reaches the end of the cycle
    return () => {
      clearInterval(interval);
      if (slide === events.length - 1) {
        setTimeout(() => {
          setSlide(0);
        }, 8000); // Wait for 3 seconds before resetting slide to 0
      }
    };
  }, [slide, events]); // Re-run the effect when slide or events change


  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {events.map((event, idx) => {
        return (
          <img
            src={event.file}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {events.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
export default SlideShow;
