import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPetsitterById } from "../../API/api";

export default function ViewSitterDetails() {
  const { id } = useParams();
  console.log('PETSITTER ID PARAMS ---> ', id);
  const [petsitter, setPetsitter] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSitter = async () => {
      try {
        const response = await fetchPetsitterById(id);
        console.log('API CALL RESPONSE - PETSITTER INFO --->', response);
      } catch (error){
        setError(error.message);
      }
    }
    fetchSitter();
  })

  return (
    <>
      <div>Petsitter details here!</div>
    </>
    // <Sheet color="neutral" variant="soft">
    // <div className="account">
    //   <h1>Account</h1>
    //   <h2>Owner</h2>
    //   <p>First Name: {user.fname}</p>
    //   <p>Last Name: {user.lname} </p>
    //   <p>Email: {user.email} </p>
    //   <p>Phone Number: {user.phone} </p>
    //   <p>Address: {user.address} </p>

    //   {/* <Button
    //     variant="text"
    //     onClick={() => {
    //       navigate(`/Pet Info`);
    //     }}
    //     >
    //     + Add Pet
    //   </Button> */}
    // </div>
    // </Sheet>
  );
}
