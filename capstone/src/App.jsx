import { useState, useEffect } from "react";
// import aiPets from "./assets/aipets.png";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navigation";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Account from "./Components/Account";

import './App.css'

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
      <NavBar setToken={setToken}/>
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
        <Route path="/account" element={<Account token={token} />} />
      </Routes>
    </div>
  );
}
export default App;
