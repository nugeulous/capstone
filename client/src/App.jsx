import { useState, useEffect } from "react";
// import aiPets from "./assets/aipets.png";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navigation";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Account from "./Components/Account";
import AboutUs from "./Components/AboutUs";
import Playground from "./Components/Playground";
import Trainers from "./Components/Trainers";
import Groomers from "./Components/Groomers";
import Walkers from "./Components/Walkers";
import Sitters from "./Components/Sitters";
import Services from "./Components/DefaultLayout/Services";
import Favorites from "./Components/Favorites";
import Messages from "./Components/Messages";
import './App.css';
import PetInfo from "./Components/PetInfo/PetInfo";
import NewEvent from "./Components/EventsPages/NewEvent"
import PetsitterRegister from "./Components/PetsitterRegister";
import PetsitterLogin from "./Components/PetsitterLogin";
import PetsitterAccount from "./Components/PetsitterAccount";
function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("token") ?? null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div>
      <NavBar setToken={setToken} token={token}/>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              token={token}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/Petsitter Login"
          element={
            <PetsitterLogin
              setToken={setToken}
              token={token}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/Petsitter Register" element={<PetsitterRegister setToken={setToken} />} />
        <Route path="/account" element={<Account token={token} setToken={setToken} />} />
        <Route path="/Petsitter Account" element={<PetsitterAccount token={token} setToken={setToken} />} />
        <Route path="/About Us" element={<AboutUs />} />
        <Route path="/Playground" element={<Playground token={token} />} />
        <Route path="/new-event" element={<NewEvent token={token} />} />
        <Route path="/services" element={<Services token={token} />} />
        <Route path="/Favorites" element={<Favorites token={token} />} />
        <Route path="/Walkers" element={<Walkers token={token} />} />
        <Route path="/Sitters" element={<Sitters token={token} />} />
        <Route path="/Groomers" element={<Groomers token={token} />} />
        <Route path="/Trainers" element={<Trainers token={token} />} />
        <Route path="/Messages" element={<Messages token={token} />} />
        <Route path="/Pet Info" element={<PetInfo token={token} />} />
      </Routes>
    </div>
  );
}
export default App;
