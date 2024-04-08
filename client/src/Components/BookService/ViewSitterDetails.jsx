import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import { fetchPetsitter, getPetsitterById } from "../../API/api";
import { Button } from "@mui/material";
import { fetchAccount } from "../../API/api";
import "./css.css"

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
            console.log('fetch petsitter', response)
            setPetsitter(response)
    
          } catch (error) {
            setError(error.message);
          }
        }
        fetchPetsitter();
        }, [fetchPetsitter]
    );

    return (
          <div className="petsitter-details-container">

            {/* left box start */}
            <div className="left-photo-box">
            
            <div>
                <img className="sitter-img" src={petsitter.image_file} alt="" />
            </div>

            <div>{petsitter.fname + " " + petsitter.lname}
                <br></br>
                <br></br>
                <Button 
              id="myButton"
              type="button"
              variant="outlined"
              onClick={() => {
                navigate(`/ServiceConfirmed`);
              }}>Book Now</Button>

                <div className="sub-header">
                  {/* <div>Rating</div>
                  <div></div> */}
                  <br></br>
                  <div>Location</div>
                  <div>{petsitter.address}</div>
                </div>
            </div>

            </div>
            {/* end left box */}

            <div className="about-me">About Me</div>
            
            <div className="reviews">Reviews
            </div>

          </div>
      );
  }