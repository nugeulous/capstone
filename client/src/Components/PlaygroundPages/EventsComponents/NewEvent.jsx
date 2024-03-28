import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Select, MenuItem } from "@mui/material/";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { fetchOwner } from "../../../API/api";
import NoAccess from "./NoAccess";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const NewEvent = ({ token }) => {
  const [owner, setOwner] = useState({});
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [event_type, setEventType] = useState("");
  const [pet_type, setPetType] = useState("");
  const [owner_Id, setOwnerId] = useState("")
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAccount = async () => {
      try {
        const fetchedOwner = await fetchOwner(token);
        setOwner(fetchedOwner);
      } catch (error) {
        setError(error.message);
      }
    };
    getAccount();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!owner.id) {
    // User is not logged in, render a message
    return <p>Please log in or register for an account to create a new event.</p>;
  }

  const handleSubmit = async (e, ownerId) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("address", address);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("file", file);
      formData.append("description", description);
      formData.append("event_type", event_type);
      formData.append("pet_type", pet_type);
      formData.append("owner_id", ownerId); // new

      const response = await axios.post(`${API_URL}/events/new-event`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });      
      console.log(response.data);
      console.log(ownerId);
      setTitle("");
      setAddress("");
      setDate("");
      setTime("");
      setFile(null);
      setDescription("");
      setEventType("");
      setPetType("");
      setOwnerId("");
      navigate("/playground");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      try {
        const fetchedOwner = await fetchOwner(token);
        setOwner(fetchedOwner);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    getAccount();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  } 
  
  if (!owner.id) {
    // User is not logged in, render a message
    return <NoAccess />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            onClick={() => {
              navigate(`/playground`);
            }}
          >
            Back to Playground
          </Button>
        </div>
        <Typography component="h1" variant="h5">
          Create New Event
        </Typography>
        <Box component="form" noValidate onSubmit={(e) => handleSubmit(e, owner.id)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Event Title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Event Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="time"
                name="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} >
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
            </Grid>
            {file && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: 100,
                  height: 100,
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded photo`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "inherit",
                    borderRadius: 20,
                  }}
                />
              </div>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="descriptiom"
                label="Event Description"
                id="description"
                multiline
                maxRows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                required
                fullWidth
                name="eventType"
                label="Event Type"
                id="eventType"
                defaultValue="Birthday"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <MenuItem value="">Select Event Type</MenuItem>
                <MenuItem value="Birthday">Birthday</MenuItem>
                <MenuItem value="Pet-freindly Picnic">Pet-freindly Picnic</MenuItem>
                <MenuItem value="Pet Parade">Pet Parade</MenuItem>
                <MenuItem value="Hike">Hike</MenuItem>
                <MenuItem value="Training Workshop">Training Workshop</MenuItem>
                <MenuItem value="Pet Adoption">Pet Adoption</MenuItem>
                <MenuItem value="Yappy Hours">Yappy Hours</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="petType"
                label="pets type"
                id="petType"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default NewEvent;
