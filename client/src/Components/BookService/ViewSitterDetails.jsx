import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPetsitter, getPetsitterById } from "../../API/api";
import { Button } from "@mui/material";
import "./Styling.css"

export default function ViewSitterDetails({token}) {
    // capture petsitter id from parameter
    const navigate = useNavigate();
    const { id } = useParams()
    const [error, setError] = useState(null);
    const [owner, setOwner] = useState(null);
    const [ petsitter, setPetsitter] = useState([])

    useEffect(() => {
        const fetchPetsitter = async () => {
          try {
            const response = await getPetsitterById(id);
            console.log('fetch petsitter', response.aboutMe)
            setPetsitter(response)
    
          } catch (error) {
            setError(error.message);
          }
        }
        fetchPetsitter();
        }, [fetchPetsitter]
    );

    return (
          <div className="container">

            <div className="vertical-box">
            
            <div>
                <img className="sitter-img" src={petsitter.file} alt="" />
            </div>

            <div>{petsitter.fname + " " + petsitter.lname}
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
                  {/* <div>Rating</div>
                  <div></div> */}
                  <br></br>
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