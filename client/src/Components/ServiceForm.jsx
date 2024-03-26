import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ServiceForm() {
  const navigate = useNavigate();
//   const [myCar, setMyCar] = useState("Volvo");
    return (
        <div className="home">
        <form>
            <label>
                Service:
            <select>
        <option >Walker</option>
        <option >Groomer</option>
        <option >Trainer</option>
        <option >Sitter</option>
      </select>
            </label>

          <label>Day:
            <input type="date" placeholder=" MM/DD/YYYY" />
          </label>
          <label>Time:
            <input type="time" placeholder=" 12:00PM" step={36000}/>
          </label>
          <label>Location:
            <input type="text" placeholder=" 5 - Digit Zip Code" />
          </label>
          <label>Pet:
          <select>
          {/* <select value={myCar} onChange={handleChange}> */}
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Fish">Fish</option>
        <option value="Bird">Bird</option>
        <option value="Hamster">Hamster</option>
        <option value="Reptile">Reptile</option>
      </select>
          </label>
          <label>Pet Size:
          <select>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
          </label>
          <label>
            <input type="submit" />
          </label>
        </form>
        </div>
    );
}

