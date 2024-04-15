import { useState, useEffect } from "react";
// import aiPets from "./assets/aipets.png";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navigation";
import Login from "./Components/Login";
import Home from "./Components/HomePage/Home";
import Register from "./Components/Register";
import Account from "./Components/Account";
import AboutUs from "./Components/AboutUs";
import Playground from "./Components/PlaygroundPages/Playground";
import Trainers from "./Components/Trainers";
import Groomers from "./Components/Groomers";
import BookService from "./Components/BookService/BookService";
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
import ReviewBookingDetails from "./Components/BookService/ReviewBookingDetails";
import AddAvailability from "./Components/AddAvailability";
import PaymentInfo from "./Components/PaymentInfo";
import OrderConfirmed from "./Components/OrderConfirmed";
import OrderHistory from "./Components/OrderHistory";
import { fetchOwner, fetchPetsitter } from "./API/api";
import ViewSitterDetails from "./Components/BookService/ViewSitterDetails";
import CssBaseline from "@mui/material/CssBaseline";
import SelectAnimalType from "./Components/PetInfo/SelectAnimalType";
import LikedEvents from "./Components/HomePage/LikedEvents";



function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("token") ?? null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(
    window.localStorage.getItem("role") ?? null
  );

  useEffect(() => {
    if (role) {
      window.localStorage.setItem("role", role);
    } else {
      window.localStorage.removeItem("role");
    }

    const handleUser = async () => {
      let user;
      if (role === 'owner'){
        user = await fetchOwner(token);
      } else if (role === 'petsitter'){
        user = await fetchPetsitter(token);        
      }
      setUser(user);
    }

    if (token) {
      window.localStorage.setItem("token", token);
      if (!user) {
        handleUser();
      }
    } else {
      window.localStorage.removeItem("token");
    }

  }, [token, role, user]);

  return (
    <div>
      <CssBaseline />
      <NavBar setToken={setToken} token={token} setRole={setRole} role={role} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<AboutUs />} />
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
        <Route path="/register" element={<Register setToken={setToken} setUser={setUser} setRole={setRole} />} />
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
        <Route path="/Petsitter Register" element={<PetsitterRegister setToken={setToken} setUser={setUser} setRole={setRole} />} />
        <Route path="/account" element={<Account token={token} setToken={setToken} user={user} setUser={setUser}/>} />
        <Route path="/Petsitter Account" element={<PetsitterAccount token={token} setToken={setToken} user={user}/>} />
        <Route path="/About Us" element={<AboutUs />} />
        <Route path="/Playground" element={<Playground token={token} user={user} />} />
        <Route path="/new-event" element={<NewEvent token={token} user={user} />} />
        <Route path="/liked-events" element={<LikedEvents token={token} user={user} />} />
        <Route path="/events/:id" element={<EventPage user={user} token={token} />} />
        <Route path="/services" element={<Services token={token} />} />
        <Route path="/Favorites" element={<Favorites token={token} />} />
        <Route path="/petsitters/:id" element={<ViewSitterDetails token={token} />} />
        <Route path="/BookService" element={<BookService token={token} />} />
        <Route path="/Sitters" element={<Sitters token={token} />} />
        <Route path="/Groomers" element={<Groomers token={token} />} />
        <Route path="/Trainers" element={<Trainers token={token} />} />
        <Route path="/Messages" element={<Messages token={token} />} />
        <Route path="/Pet Info" element={<PetInfo token={token} user={user} />} />
        <Route path="/pet info/:petType" element={<PetInfo token={token} user={user} />} />
        <Route path="/Select Animal Type" element={<SelectAnimalType token={token} user={user} />} />
        <Route path="/ReviewBookingDetails" element={<ReviewBookingDetails token={token} />} />
        <Route path="/PaymentInfo" element={<PaymentInfo token={token} />} />
        <Route path="/OrderConfirmed" element={<OrderConfirmed token={token} />} />
        <Route path="/OrderHistory" element={<OrderHistory token={token} setToken={setToken} user={user} setUser={setUser} />} />
        <Route path="/AddAvailability" element={<AddAvailability token={token} setToken={setToken} user={user} setUser={setUser} />} />
      </Routes>
    </div>
  );
}
export default App;
