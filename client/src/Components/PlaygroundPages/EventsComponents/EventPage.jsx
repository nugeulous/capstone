import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../API/eventsApi";
import { getUserById } from "../../../API/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RsvpIcon from "@mui/icons-material/Rsvp";
import LikedEvents from "../../HomePage/LikedEvents";

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [likedEvents, setLikedEvents] = useState([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
    const photoPath = `${API_URL}/events/getPhoto?fileName=`;

    const topLevel = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getEventById(id);
                const formattedDate = new Date(response.date).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                );
                const formattedTime = new Date(
                    `1970-01-01T${response.time}`
                ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

                setEvent({
                    ...response,
                    date: formattedDate,
                    time: formattedTime,
                });
                const userResponse = await getUserById(response.userId);
                setUser(userResponse);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchEvent();
    }, [id]);

    const handleAddToFavorites = () => {
        // Check if the event is already in liked events
        if (!likedEvents.some((e) => e.id === event.id)) {
            setLikedEvents([...likedEvents, event]); // Add event to liked events array
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event || !user) {
        return <div>Loading...</div>;
    }

    const imagePath = event.file.startsWith("http")
        ? event.file
        : photoPath + event.file;

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
            <div style={{ maxWidth: "80%", display: "block", margin: "auto" }}>
                <div style={{ backgroundColor: "lightgrey", maxHeight: "400px", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius: "5px" }}>
                    <img style={{ width: "600", height: "400px", display: "block", margin: "auto" }} src={imagePath} alt={event.title} />
                </div>
                <div style={topLevel}>
                    <div>
                        <h4>{event.date}</h4>
                    </div>
                    <div>
                        <IconButton color="secondary" aria-label="favorite" onClick={handleAddToFavorites}>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="rsvp">
                            <RsvpIcon />
                        </IconButton>
                    </div>
                </div>
                <h2>{event.title} | {event.date} | {event.address} </h2>
                <h4>{event.description}</h4>
                <h2>Date and time</h2>
                <p> {event.date} | {event.time}</p>
                <h2>Location</h2>
                <p>Meet up at: {event.address}</p>
                <p>{event.eventtype}</p>
                <p>{event.pettype}</p>
                <h5>Posted by: {user.fname} {user.lname}</h5>
                <LikedEvents likedEvents={likedEvents} />
            </div>
        </>
    );
};

export default EventPage;