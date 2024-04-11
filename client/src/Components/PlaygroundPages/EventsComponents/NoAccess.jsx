import React from "react";
import noAccess from "../../../images/noAccess.png";
import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img style={{ width: "400px", height: "auto" }} src={noAccess} alt="" />
      <p>Please log in or register for an account to create a new event.</p>
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
        {"Don't have an account? Sign Up"}
      </p>
      <Grid item>
                <Link
                  href="#"
                  onClick={() => {
                    navigate(`/Login`);
                  }}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
    </div>
  );
};

export default NoAccess;
