import { useState, useEffect } from "react";
// import aiPets from "./assets/aipets.png";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navigation";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Account from "./Components/Account";
import AboutUs from "./Components/AboutUs";
import Playground from "./Components/PlaygroundPages/Playground";
import Trainers from "./Components/Trainers";
import Groomers from "./Components/Groomers";
import BookService from "./Components/BookService";
import Sitters from "./Components/Sitters";
import Services from "./Components/DefaultLayout/Services";
import Favorites from "./Components/Favorites";
import Messages from "./Components/Messages";
import './App.css';
import PetInfo from "./Components/PetInfo/PetInfo";
import NewEvent from "./Components/PlaygroundPages/EventsComponents/NewEvent"
import EventPage from "./Components/PlaygroundPages/EventsComponents/EventPage"
import PetsitterRegister from "./Components/PetsitterRegister";
import PetsitterLogin from "./Components/PetsitterLogin";
import PetsitterAccount from "./Components/PetsitterAccount";
import ServiceConfirmed from "./Components/ServiceConfirmed";
import PaymentInfo from "./Components/PaymentInfo";
import OrderConfirmed from "./Components/OrderConfirmed";

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("token") ?? null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }

  }, [token, user, role]);

  return (
    <div>
      <NavBar setToken={setToken} token={token} role={role}/>
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
              setRole={setRole}
              setUser={setUser}
              user={user}
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
              setRole={setRole}
              setUser={setUser}
              user={user}
            />
          }
        />
        <Route path="/Petsitter Register" element={<PetsitterRegister setToken={setToken} />} />
        <Route path="/account" element={<Account token={token} setToken={setToken} user={user} setUser={setUser}/>} />
        <Route path="/Petsitter Account" element={<PetsitterAccount token={token} setToken={setToken} user={user}/>} />
        <Route path="/About Us" element={<AboutUs />} />
        <Route path="/Playground" element={<Playground token={token} />} />
        <Route path="/new-event" element={<NewEvent token={token} />} />
        <Route path="/events/:id" element={<EventPage token={token} />} />
        <Route path="/services" element={<Services token={token} />} />
        <Route path="/Favorites" element={<Favorites token={token} />} />
        <Route path="/BookService" element={<BookService token={token} />} />
        <Route path="/Sitters" element={<Sitters token={token} />} />
        <Route path="/Groomers" element={<Groomers token={token} />} />
        <Route path="/Trainers" element={<Trainers token={token} />} />
        <Route path="/Messages" element={<Messages token={token} />} />
        <Route path="/Pet Info" element={<PetInfo token={token} />} />
        <Route path="/ServiceConfirmed" element={<ServiceConfirmed token={token} />} />
        <Route path="/PaymentInfo" element={<PaymentInfo token={token} />} />
        <Route path="/OrderConfirmed" element={<OrderConfirmed token={token} />} />
      </Routes>
    </div>
  );
}
export default App;
