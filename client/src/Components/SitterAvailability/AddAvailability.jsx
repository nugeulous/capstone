import { useState } from "react";
import "./Styling.css"
import { Button } from "@mui/material";
import { addAvailability } from "../../API/availabilityApi"

export default function AddAvailability({user, token}) {
  const [start_date, setStartDate] = useState('2024-01-01');
  const [end_date, setEndDate] = useState('2024-12-31');
  const [start_time, setStartTime] = useState("12:00");
  const [end_time, setEndTime] = useState("23:00");
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState(null);

  // upon submitting, send inputs to api
async function handleSubmit(event) {
    event.preventDefault();
console.log('token:', token)
    try {
      const result = await addAvailability({
        petsitter_id: user.id,
        start_date,
        end_date,
        start_time,
        end_time }
      )
      setAvailability(result);
      console.log('POSTED AVAILALABILITY RESULT ----> ', result);
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
              <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)}/>
            </label>
            <br />
            <label>End Date:
              <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)}/>
            </label>
            <br />
            <br />
            <label>Start Time:
              <input type="time" step={3600} value={start_time} onChange={(e) => setStartTime(e.target.value)} />
            </label>
            <br />
            <label>End Time:
              <input type="time" step={3600} value={end_time} onChange={(e) => setEndTime(e.target.value)}/>
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