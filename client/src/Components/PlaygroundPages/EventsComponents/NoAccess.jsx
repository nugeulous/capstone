import React from "react";
import noAccess from "../../../images/noAccess.png";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img style={{ width: "400px", height: "auto" }} src={noAccess} alt="" />
      <p>Please log in or register for an account to access this feature.</p>
      <Button
        onClick={() => {
          navigate(`/login`);
        }}
      >
        LOGIN
      </Button>
      <p
      style={{  }}
        onClick={() => {
          navigate(`/register`);
        }}
        variant="body2"
      >
        {"Don't have an account? Click Here to Sign Up"}
      </p>
    </div>
  );
};

export default NoAccess;
