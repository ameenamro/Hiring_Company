import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarApp from "./NavbarApp";
import Footer from "./Footer";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Employee from "../pages/Employee";
import User from "../pages/User";
import axios from "axios";
import LoginWorker from "../pages/LoginWorker";
function Routers() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setuser] = useState("");


  return (
    <Router>
      <NavbarApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route
          path="/Login"
          element={
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            ></Login>
          }
        />
        <Route
          path="/LoginWorker"
          element={
            <LoginWorker
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            ></LoginWorker>
          }
        />
        <Route path="/Home" element={<Home></Home>} />
        <Route path="/User" element={<User></User>} />
        <Route path="/Employee/:id" element={<Employee></Employee>} />
        <Route path="/Admin" element={<Admin></Admin>} />
        

      </Routes>

      <Footer />
    </Router>
  );
}

export default Routers;
