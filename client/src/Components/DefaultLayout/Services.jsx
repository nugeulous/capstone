
import React from "react";
import "./defaultLayout.css";
import grooming from "../../images/grooming.jpg";
import petsitter from "../../images/petsitter.png";
import walking from "../../images/walking.jpg";
import SpaIcon from "@mui/icons-material/Spa";
import PetsIcon from "@mui/icons-material/Pets";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dogtraining from "../../images/dogtraining.jpeg"
import SchoolIcon from '@mui/icons-material/School';

const Services = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="title">
        <p>Our Services</p>
        <h2>What We Offer</h2>
      </div>
      <div className="services">
      <Button
          className="service"
          onClick={() => {
            navigate(`/BookingForm`);
          }}
        >
          <img src={walking} alt="" />
          <div className="caption">
            <PetsIcon sx={{ fontSize: 40 }} />
            <p>Walkers</p>
          </div>
        </Button>
        <Button
          className="service"
          onClick={() => {
            navigate(`/BookingForm`);
          }}
        >
          <img src={grooming} alt="" />
          <div className="caption">
            <SpaIcon sx={{ fontSize: 40 }} />
            <p>Grooming</p>
          </div>
        </Button>
  
                <Button
          className="service"
          onClick={() => {
            navigate(`/BookingForm`);
          }}
        >
          <img src={dogtraining} alt="" />
          <div className="caption">
            <SchoolIcon sx={{ fontSize: 40 }} />
            <p>Training</p>
          </div>
        </Button>
        <Button
          className="service"
          onClick={() => {
            navigate(`/BookingForm`);
          }}
        >
          <img src={petsitter} alt="" />
          <div className="caption">
            <HomeOutlinedIcon sx={{ fontSize: 40 }} />
            <p>Pet Sitters</p>
          </div>
        </Button>

      </div>
    </div>
  );
};

export default Services;
