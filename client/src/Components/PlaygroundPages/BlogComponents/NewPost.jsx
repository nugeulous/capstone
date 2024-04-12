import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Grid, Select, MenuItem } from "@mui/material/";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createPost } from "../../../API/api";

const NewPost = ({ user, onNewPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    try {
        let ownerid;
        let petsitterid;
      if (user.role === "owner") {
        ownerid = user.id;
      } else {
        petsitterid = user.id;
      }
     const newPost = { title, content, ownerid, petsitterid};
      const result = await createPost(newPost);
      onNewPost(result);
      
      setTitle("");
      setContent("");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setTitle("");
    setContent("");
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
          Create New Post
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
                id="content"
                label="Post Content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#135b6d" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewPost;
