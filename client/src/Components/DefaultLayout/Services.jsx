// import * as React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";

// export default function Services() {
//   const navigate = useNavigate();
//   return (
//     <>
//       <h1>Our Services</h1>
//       <Box
//         component="span"
//         sx={{ display: "flex", gap: 2, transform: "scale(.9)" }}
//       >
//         <Card sx={{ maxWidth: 345 }}>
//           <CardMedia
//             sx={{ height: 140 }}
//             image="/static/images/cards/contemplative-reptile.jpg"
//             title="green iguana"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               Grooming
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Connect with groomers for your lovely pet with ease! Our approved
//               pet groomers will provide your pet with a friendly and clean
//               enviroment.
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button
//               onClick={() => {
//                 navigate(`/Groomers`);
//                 size = "small";
//               }}
//             >
//               Find a groomer
//             </Button>
//             <Button
//               onClick={() => {
//                 navigate(`/About us`);
//                 size = "small";
//               }}
//             >
//               Learn More
//             </Button>
//           </CardActions>
//         </Card>

//         <Card sx={{ maxWidth: 345 }}>
//           <CardMedia
//             sx={{ height: 140 }}
//             image="/static/images/cards/contemplative-reptile.jpg"
//             title="green iguana"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               Trainers
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Connect with groomers for your lovely pet with ease! Our approved
//               pet groomers will provide your pet with a friendly and clean
//               enviroment.
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button
//               onClick={() => {
//                 navigate(`/Trainers`);
//                 size = "small";
//               }}
//             >
//               Find a Trainer
//             </Button>
//             <Button
//               onClick={() => {
//                 navigate(`/About us`);
//                 size = "small";
//               }}
//             >
//               Learn More
//             </Button>
//           </CardActions>
//         </Card>

//         <Card sx={{ maxWidth: 345 }}>
//           <CardMedia
//             sx={{ height: 140 }}
//             image="/static/images/cards/contemplative-reptile.jpg"
//             title="green iguana"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               Sitters
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Connect with groomers for your lovely pet with ease! Our approved
//               pet groomers will provide your pet with a friendly and clean
//               enviroment.
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button
//               onClick={() => {
//                 navigate(`/Sitters`);
//                 size = "small";
//               }}
//             >
//               Find a sitter
//             </Button>
//             <Button
//               onClick={() => {
//                 navigate(`/About us`);
//                 size = "small";
//               }}
//             >
//               Learn More
//             </Button>
//           </CardActions>
//         </Card>
//       </Box>
//     </>
//   );
// }

import React from "react";
import "./services.css";
import grooming from "../../images/grooming.jpg";
import petsitter from "../../images/petsitter.png";
import walking from "../../images/walking.jpg";
import SpaIcon from "@mui/icons-material/Spa";
import PetsIcon from "@mui/icons-material/Pets";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Services = () => {
    const navigate = useNavigate();

  return (
    <div>
      <h1>Our Services</h1>
      <div className="services">
        <div className="service">
          <img src={grooming} alt="" />
          <div className="caption">
            <SpaIcon sx={{ fontSize: 40 }} />
            <p>Grooming Services</p>
          </div>
          <Button onClick={() => {
              navigate(`/Groomers`)
            }} ></Button>
        </div>
        <div className="service">
          <img src={petsitter} alt="" />
          <div className="caption">
            <HomeOutlinedIcon sx={{ fontSize: 40 }} />
            <p>Pet Sitters</p>
          </div>
          
        </div>
        <div className="service">
          <img src={walking} alt="" />
          <div className="caption">
            <PetsIcon sx={{ fontSize: 40 }} />
            <p>Walkers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
