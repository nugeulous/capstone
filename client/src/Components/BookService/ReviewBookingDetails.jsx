import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';

export default function ReviewBookingDetails({ details, endTime, startTime, date }) {
    const location = useLocation();
    const sitterDetails = location.state.details;
    const startTimeInput = location.state.startTime;
    const endTimeInput = location.state.endTime;
    const dateInput = location.state.date;
    const navigate = useNavigate();

    const boxStyle = {
        border: '10px solid black',
        borderRadius: '5px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 8px 12px 0', 
    };

    const sectionStyle = {
        marginBottom: '20px',
    };

    return (
        <div className="home" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: "bold" }}>Confirm Your Booking</h1>
            <div style={boxStyle}>
                <div style={sectionStyle}>
                    <AccessTimeIcon fontSize="large"></AccessTimeIcon>
                    <b style={{ fontSize: '1.5rem', marginLeft: '10px' }}> Time</b>
                    <br></br>
                    {startTimeInput} - {endTimeInput}
                </div>
                <div style={sectionStyle}>
                    <CalendarMonthIcon fontSize="large"></CalendarMonthIcon>
                    <b style={{ fontSize: '1.5rem', marginLeft: '10px' }}>   Date</b>
                    <br></br>
                    {dateInput}
                </div>
                <div style={sectionStyle}>
                    <SportsMartialArtsIcon fontSize="large"></SportsMartialArtsIcon>
                    <b style={{ fontSize: '1.5rem', marginLeft: '10px' }}>Walker</b>
                    <br />
                    {sitterDetails.fname + " " + sitterDetails.lname}
                </div>
                <div style={sectionStyle}>
                    <b style={{ fontSize: '1.5rem' }}>Est. Total: ${sitterDetails.hourlycost}</b>
                </div>
            </div>
            <Button sx={{marginTop: 5, width: 240, height: 45, bgcolor: "#135b6d", color: "white", fontWeight: "bold"}}
                variant="outlined"
                onClick={() => {
                    navigate(`/PaymentInfo`);
                }}
            >
                PAY
            </Button>
            <Button sx={{marginTop: 5, width: 240, height: 45, bgcolor: "#135b6d", color: "white", fontWeight: "bold", marginLeft: 2}}
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