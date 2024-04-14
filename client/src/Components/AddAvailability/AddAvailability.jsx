import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Styling.css"
import { Button } from "@mui/material";
import { addAvailability } from "../../API/api";

export default function AddAvailability({user}) {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("23:00");
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState(null);

  // upon submitting, send inputs to api
async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await addAvailability({
        petsitterId: user.id,
        startDate,
        endDate,
        startTime,
        endTime }
      )
      setAvailability(result);
      console.log('RESULT ----> ', result);
    } catch (error) {
      setError(error.message);
      console.log('Error Message: ', error.message);
      console.log('Error: ', error);
    } 

  }

  return (
    <div className="form-container">
      <div>
      <form className="availability-input" style={{fontSize: "25px"}} onSubmit={handleSubmit}>
      🚶🏾‍♂️ 🫧 🧽 🐈 🐍
      <br />
      <br />
      Input your availability below
        <br />
        <br />
            <label>Start Date:
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            </label>
            <br />
            <label>End Date:
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            </label>
            <br />
            <br />
            <label>Start Time:
              <input type="time" step={3600} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </label>
            <br />
            <label>End Time:
              <input type="time" step={3600} value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
            </label>
            <br />
            <br />
            <Button type="submit" variant="outlined">
            Submit
          </Button>
        </form>
        </div>
    </div>
  );
}
