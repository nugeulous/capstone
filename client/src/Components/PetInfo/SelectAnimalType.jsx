
import React from "react";
import "./chosePet.css";
import dogs from "../../images/dogs4.webp";
import cat from "../../images/cat.jpeg";
import fish from "../../images/fish.webp";
import hamster from "../../images/hamster.jpeg";
import reptiles from "../../images/reptiles3.jpeg";
import pig from "../../images/pig.jpeg";
import walking from "../../images/walking.jpg";
import SpaIcon from "@mui/icons-material/Spa";
import PetsIcon from "@mui/icons-material/Pets";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SelectAnimalType = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState();

  useEffect(() => {
    if (petType) {
        navigate(`/pet info/${petType}`);
    }
  }, [petType]);

  return (
    <div>
      <div className="title">
        <p>Add A Pet</p>
        <h2>Choose the type of pet you'd like to add</h2>
      </div>
      <div className="petTypes">
        <Button
            className="petType"
            onClick={() => {
                setPetType("Cat");
            }}
            >
            <img src={cat} alt="" />
            <div className="caption">
                <SpaIcon sx={{ fontSize: 40 }} />
                <p>Cat</p>
            </div>
        </Button>

        <Button
          className="petType"
          onClick={() => {
            setPetType("Dog");
          }}
        >
          <img src={dogs} alt="" />
          <div className="caption">
            <SpaIcon sx={{ fontSize: 40 }} />
            <p>Dog</p>
          </div>
        </Button>

        <Button
          className="petType"
          onClick={() => {
            setPetType("Fish");
          }}
        >
          <img src={fish} alt="" />
          <div className="caption">
            <SpaIcon sx={{ fontSize: 40 }} />
            <p>Fish</p>
          </div>
        </Button>

      </div>
      <div className="petTypes">
        
        <Button
            className="petType"
            onClick={() => {
                setPetType("Pig");
            }}
            >
            <img src={pig} alt="" />
            <div className="caption">
                <SpaIcon sx={{ fontSize: 40 }} />
                <p>Pig</p>
            </div>
            </Button>

            <Button
            className="petType"
            onClick={() => {
                setPetType("Reptile");
            }}
            >
            <img src={reptiles} alt="" />
            <div className="caption">
                <SpaIcon sx={{ fontSize: 40 }} />
                <p>Reptile</p>
            </div>
            </Button>

        <Button
          className="petType"
          onClick={() => {
            setPetType("Hamster");
          }}
        >
          <img src={hamster} alt="" />
          <div className="caption">
            <SpaIcon sx={{ fontSize: 40 }} />
            <p>Hamster</p>
          </div>
        </Button>

      </div>
    </div>
  );
};

export default SelectAnimalType;
