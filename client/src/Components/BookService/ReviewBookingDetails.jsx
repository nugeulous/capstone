import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { setSitterDetails, setBookingDetails } from '../../redux/actions/slices/bookingSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import "./Styling.css"

export default function ReviewBookingDetails() {
    // store useNavigate to navigate to next page of flow  
    const navigate = useNavigate();

    // access selected booking details from Redux state
    const bookingInfo = useSelector((state) => state.booking.bookingDetails);

    // access selected petsitter details from Redux state
    const petsitter = useSelector((state) => state.booking.selectedSitter);

    // define styling - TODO: shift to html css file
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

    // render booking details
    return (
        <div className="home" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: "bold" }}>Confirm Your Booking</h1>
            <div style={boxStyle}>
                <div style={sectionStyle}>
                    <AccessTimeIcon fontSize="large"></AccessTimeIcon>
                    <b style={{ fontSize: '1.5rem', marginLeft: '10px' }}> Time</b>
                    <br></br>
                    {bookingInfo.startTime} - {bookingInfo.endTime}
                </div>
                <div style={sectionStyle}>
                    <CalendarMonthIcon fontSize="large"></CalendarMonthIcon>
                    <b style={{ fontSize: '1.5rem', marginLeft: '10px' }}>   Date</b>
                    <br></br>
                    {bookingInfo.date}
                </div>
                <div style={sectionStyle}>
                    <SportsMartialArtsIcon fontSize="large"></SportsMartialArtsIcon>
                    <b style={{ fontSize: '1.5rem', marginLeft: '10px' }}>Walker</b>
                    <br />
                    {petsitter.fname + " " + petsitter.lname}
                </div>
                <div style={sectionStyle}>
                    <b style={{ fontSize: '1.5rem' }}>Est. Total: ${petsitter.hourlycost}</b>
                </div>
            </div>
            <Button sx={{ marginTop: 5, width: 240, height: 45, bgcolor: "#135b6d", color: "white", fontWeight: "bold" }}
                variant="outlined"
                onClick={() => {
                    navigate(`/PaymentInfo`);
                }}
            >
                PAY
            </Button>
            <Button sx={{ marginTop: 5, width: 240, height: 45, bgcolor: "#135b6d", color: "white", fontWeight: "bold", marginLeft: 2 }}
                variant="outlined"
                onClick={() => {
                    navigate(`/BookingForm`);
                }}
            >
                BACK TO SEARCH
            </Button>
        </div>
    );
}