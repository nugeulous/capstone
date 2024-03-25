import React from "react";
import "../DefaultLayout/defaultLayout.css";
import walking from "../../images/walking.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlaygroundDefault = () => {
  const navigate = useNavigate();

  return (
    <div className="pgDefault">
      <div className="pgDefaultLeft">
        <Button
          className="service"
          onClick={() => {
            navigate(`/Playground`);
          }}
        >
          <img src={walking} alt="" className="pgDefault-img" />
        </Button>
      </div>

      <div className="pgDefaultRight">
        <h3>Playground</h3>
        <h2>Mingle with other pets in your local area</h2>
        <p>
          Our "Playground" feature—a vibrant space where pets of all kinds
          thrive through interactive play and socialization. Here's why it's a
          must for your furry friend:
        </p>
        <p>
          {" "}
          Interactive Play: Hang out with Alltails users in local areas that
          provides a safe haven for your pets to engage in lively play sessions.
        </p>
        <p>
          Socialization Hub: Pets mingle freely with others, honing vital social
          skills like communication and understanding of body language.
        </p>
      </div>
    </div>
  );
};

export default PlaygroundDefault;
