

import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Button } from "@mui/material";
import "./Styling.css";

export default function ViewSitterDetails() {
  // store useNavigate to navigate to next page of flow  
  const navigate = useNavigate();

    // access selected petsitter details from Redux state
    const petsitter = useSelector((state) => state.booking.selectedSitter);

    if (!petsitter) {
        return <div>No sitter details available.</div>;
    }

    // render petsitter details
    return (
        <div className="container">
            <div className="vertical-box">
                <div>
                    <img className="sitter-img" src={petsitter.file} alt="" />
                </div>
                <div>
                    {petsitter.fname + " " + petsitter.lname}
                    <br></br>
                    <br></br>
                    <Button
                        id="myButton"
                        type="button"
                        variant="outlined"
                        onClick={() => {
                            navigate(`/ReviewBookingDetails`);
                        }}>Book Now</Button>

                    <div className="sub-header">
                        <div>Location</div>
                        <div>{petsitter.address}</div>
                        <br></br>
                        <div>"{petsitter.tagline}"</div>
                        <br />
                        <div>Hourly Rate:</div>
                        <div>${petsitter.hourlycost}</div>
                    </div>
                </div>
            </div>

            <div className="horizontal-box">About Me
                <br />
                <br />
                <div>{petsitter.aboutme} </div>
            </div>
            <div className="horizontal-box">Reviews
            </div>
        </div>
    );
}
