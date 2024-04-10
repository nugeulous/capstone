import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';


export default function ReviewBookingDetails({details, endTime, startTime, date}) {
    const location = useLocation();
    const sitterDetails = location.state.details;
    const startTimeInput = location.state.startTime;
    const endTimeInput = location.state.endTime;
    const dateInput = location.state.date;
    const navigate = useNavigate();

    return (
        <div className="home">
            <h1>Confirm Your Booking</h1>
            <h2></h2>
            <br></br>
            <AccessTimeIcon fontSize="small"></AccessTimeIcon>
            <b> Time</b>
            <br></br>
            {startTimeInput} - {endTimeInput}
            <br></br>
            <br></br>
            <br></br>
            <CalendarMonthIcon fontSize="small"></CalendarMonthIcon>
            <b>   Date</b>
            <br></br>
            {dateInput}
            <br></br>
            <br></br>
            <br></br>
            <SportsMartialArtsIcon fontSize="small"></SportsMartialArtsIcon>
            <b>Walker</b>
            <br />
            {sitterDetails.fname + " " + sitterDetails.lname}
            <br></br>
            <br></br>
            <br></br>
            <b>Est. Total:</b>
            <br></br>
            <br></br>
            <br></br>
            <Button
        variant="outlined"
        onClick={() => {
          navigate(`/PaymentInfo`);
        }}
      >
       PAY
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/BookService`);
        }}
      >
       BACK TO SEARCH
</Button>
        </div>
    );
}