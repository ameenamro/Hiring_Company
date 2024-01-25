import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarApp from "./NavbarApp";
import Footer from "./Footer";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Admin from "../pages/Admin";
import Employee from "../pages/Employee";
import User from "../pages/User";
import axios from "axios";
import AboutUs from "../pages/AboutUs";
import Employeeprofile from "../pages/Employeeprofile";
import LoginWorker from "../pages/LoginWorker";
function Routers() {
  const initialIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('token') ;

  const [isLoggedInToken, setIsLoginToken] = useState("token");
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  // Update local storage whenever isLoggedIn changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('isLoggedInToken', isLoggedInToken)
     
  }, [isLoggedIn]);
 

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
              isLoggedInToken={isLoggedInToken}
              setIsLoginToken={setIsLoginToken}
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
        <Route path="/Home" element={<HomePage></HomePage>} />
        <Route path="/User" element={<User
           isLoggedInToken={isLoggedInToken}
           setIsLoginToken={setIsLoginToken}
        
        
        ></User>} />
        <Route path="/Employee/:id" element={<Employee></Employee>} />
        <Route path="/Employeeprofile/:id" element={<Employeeprofile></Employeeprofile>} />
        <Route path="/Admin" element={<Admin></Admin>} />
        <Route path="/AboutUs" element={<AboutUs></AboutUs>} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default Routers;
