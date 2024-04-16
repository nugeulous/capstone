import React from "react";
import noAccess from "../../../images/noAccess.png";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  const navigate = useNavigate();

  return (
    <>
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img style={{ width: "400px", height: "auto" }} src={noAccess} alt="" />
      <p>Please log in or register for an account to access this feature.</p>
    </div>
        <div
        style={{ display: "flex", justifyContent: "center", gap: '16px' }}
      >
        <Button
        sx={{ mt: 3, mb: 2, bgcolor: "#135b6d" }}
        onClick={() => {
          navigate(`/login`);
        }}
      >
        LOGIN
      </Button>
      <Button
      sx={{ mt: 3, mb: 2, bgcolor: "#135b6d" }}
        onClick={() => {
          navigate(`/register`);
        }}
      >
        REGISTER
      </Button>
      </div>
      </>
  );
};

export default NoAccess;
