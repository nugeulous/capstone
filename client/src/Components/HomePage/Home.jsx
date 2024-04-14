import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import SlideShow from "./SlideShow";
import Services from "../DefaultLayout/Services"

export default function Home() {
    const navigate = useNavigate();
  return (
    <>

      <h1>Home</h1>
      <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
      <SlideShow />
        </div>
      <Services/>
      

      
      {/* <Button
        variant="outlined"
        onClick={() => {
          navigate(`/BookService`);
        }}
      >
      Walkers
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Groomers`);
        }}
      >
      Groomers
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Trainers`);
        }}
      >
      Training
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/Sitters`);
        }}
      >
        Pet Sitters
      </Button> */}

{/* Monica says order history is showing up on hers. Lets get whatever she has in here instead of this lonely button.  */}

      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/OrderHistory`);
        }}
      >
        Order History
      </Button>

    </>

  );
}