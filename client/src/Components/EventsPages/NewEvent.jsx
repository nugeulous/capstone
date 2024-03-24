import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../API/eventsApi";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
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
        const result = await createEvent(title, address, date, time, photos, description, event_type, pet_type);
        console.log(result);
      } catch (error) {
        setError(error.message);
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
              {error && <p>{error}</p>}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="photo"
                    label="Event Photo"
                    name="photo"
                    value={photos}
                    onChange={(e) => setPhotos(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="descriptiom"
                    label="Event Description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="event_type"
                    label="Event type"
                    id="event_type"
                    value={event_type}
                    onChange={(e) => setEventType(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="pet_type"
                    label="Pet Description"
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
  