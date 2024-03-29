import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../API/eventsApi";
import { uploadPhoto } from "../../API/photoUploadApi";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Select, MenuItem, InputLabel } from "@mui/material/";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const NewEvent = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [photos, setPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [event_type, setEventType] = useState("");
  const [pet_type, setPetType] = useState("");
  // const [owner_id, setOwnerId] = useState("");
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createEvent(
        title,
        address,
        date,
        time,
        photos,
        description,
        event_type,
        pet_type
      );
      console.log(result);
      setTitle("");
      setAddress("");
      setDate("");
      setTime("");
      setPhotos("");
      setDescription("");
      setEventType("");
      setPetType("");
      setError("");
      setValidationError("");
      navigate("/playground");
      //   setOwnerId("");
    } catch (error) {
      setError(error.message);
    }
  };

  async function addPhoto(e) {
    e.preventDefault();
    const fileInput = e.target.files[0]; 
    if (!fileInput) {
        setError("Please select a photo");
        return;
    }
    try {
        const formData = new FormData(); 
        formData.append("photo", fileInput); 
        await uploadPhoto(formData);
        setError(null); 
    } catch (error) {
        setError("Failed to upload photo. Please try again later.");
        console.error("Error uploading photo:", error);
    }
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
        <Typography component="h1" variant="h5">
          Create New Event
          {validationError && <p>{validationError}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                label="Event Date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="time"
                label="Event Time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} style={{ display: "flex", gap: 5 }}>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPhotos(reader.result);
                      addPhoto(e);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Grid>
            {photos && (
              <div style={{ display: "flex", justifyContent: "center", width: 100, height: 100 }}>
                  <img
                    src={photos}
                    alt={`Uploaded photo`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "inherit",
                      borderRadius: 20
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
                name="event_type"
                label="Event Type"
                id="event_type"
                defaultValue="Birthday"
                value={event_type}
                onChange={(e) => setEventType(e.target.value)}
              >
                <MenuItem value="">Select Event Type</MenuItem>
                <MenuItem value="birthday">Birthday</MenuItem>
                <MenuItem value="picnic">Pet-freindly Picnic</MenuItem>
                <MenuItem value="playdate">Playdate</MenuItem>
                <MenuItem value="parade">Pet Parade</MenuItem>
                <MenuItem value="hike">Hike</MenuItem>
                <MenuItem value="training">Training Workshop</MenuItem>
                <MenuItem value="adoption">Pet Adoption</MenuItem>
                <MenuItem value="yappyHour">Yappy Hours</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="pet_type"
                label="pets type"
                id="pet_type"
                value={pet_type}
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
