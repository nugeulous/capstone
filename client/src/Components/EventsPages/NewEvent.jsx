import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../API/eventsApi";
import { uploadPhoto } from "../../API/photoUploadApi";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Grid, Select, MenuItem, InputLabel } from "@mui/material/";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
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

  async function handleSubmit(event) {
    event.preventDefault();
    setTitle("");
    setAddress("");
    setDate("");
    setTime("");
    setPhotos("");
    setDescription("");
    setEventType("");
    setPetType("");
    //   setOwnerId("");
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
    } catch (error) {
      setError(error.message);
    }
  }

  async function addPhotobyLink(e) {
    e.preventDefault();
    if (!photos) {
      setError("Please enter a photo link.");
      return;
    }
    try {
      const result = await uploadPhoto(photos);
      console.log(result);
      setError(null); // Reset error state
      setPhotos(""); // Clear input field after successful upload
      alert("Photo uploaded successfully!");
    } catch (error) {
      setError("Failed to upload photo. Please try again later.");
      console.error("Error uploading photo:", error);
    }
  }
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
              <Grid item xs={12} sm={12} style={{display: "flex", gap: 5}}>
                <TextField
                  required
                  fullWidth
                  id="photo"
                  label="Event Photo"
                  name="photo"
                  value={photos}
                  onChange={(e) => setPhotos(e.target.value)}
                />
                <Button 
                onClick={addPhotobyLink}
                  style={{
                    width: 100,
                    height: 55,
                    border: "1px solid lightgrey",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "lightgrey",
                  }}
                  type="button"
                >
                  <AddIcon />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    border: "1px solid mediumorchid",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button >
                    <CloudUploadOutlinedIcon />
                  </Button>
                </div>
              </Grid>
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
    </ThemeProvider>
  );
};
export default NewEvent;
