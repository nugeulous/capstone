import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import "./Styling.css"

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
            <div className="container">
              <div>
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
              </div>
              <SportsMartialArtsIcon fontSize="small"></SportsMartialArtsIcon>
              <b>Sitter</b>
              <br />
              {sitterDetails.fname + " " + sitterDetails.lname}
              <br></br>
              <br></br>
              <br></br>
              <b>Est. Total: ${sitterDetails.hourlycost}</b>
              <br></br>
              <br></br>
              <br></br>
            </div>
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