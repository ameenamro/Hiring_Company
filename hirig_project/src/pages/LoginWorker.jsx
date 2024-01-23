import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Employeeprofile from "./Employeeprofile";
import axios from "axios";
function LoginWorker({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("ameen");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [user, setuser] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const gradientBackground = {
    background: "linear-gradient(to right, #e6e8ee, rgb(237, 237, 237)",
    padding: "15px",
    marginTop: "150px",
    borderRadius: "10px",
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // alart nafiction
  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
///////////////////////////////////////////////
// resizedata
  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setUsername("");
  };
  ////////////////////////////////
  //send to login page
  const joinuser = (rs) => {
    navigate("/login");
  };
////////////////////////
//loginpage
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (confirmPassword !== password) {
        handleSnackbarOpen("error", "The passwords do not match.");
        setPassword("");
        setconfirmPassword("");
      } else {
        const newRigaster = {
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        };
        try {
          const response = await axios.post(
            "https://hiring-company.onrender.com/api/v1/worker/register",
            newRigaster
          );
          setuser(response.data);
          setIsLoggedIn(true);
          handleSnackbarOpen("success", "Form submitted successfully!");

          console.log("Data fetched successfully:", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          handleSnackbarOpen(
            "error",
            "Error submitting form. Please try again."
          );
        }
      }
    } else {
      const newlogin = {
        username: username,
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          "https://hiring-company.onrender.com/api/v1/worker/login",
          newlogin
        );
        console.log("Data fetched successfully:", response.data.id);
        setuser(response.data);
        setIsLoggedIn(true);

        navigate(`/Employeeprofile/${response.data.id}`);
      } catch (error) {
        handleSnackbarOpen("error", "Error submitting form. Please try again.");

        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        mt: 8,
        maxHeight: "150vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      style={gradientBackground}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Paper
        elevation={4}
        sx={{
          padding: 3,
          textAlign: "center",
          borderRadius: "10px",
          width: "100%", // Take full width
          maxWidth: "400px", // Set max width
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          {isLogin ? "Login" : "Register"}
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              id="confirmPassword"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          )}
          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Username"
              label="Username"
              type="user"
              id="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>
        <Button onClick={handleToggleForm} sx={{ mt: 2 }}>
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </Button>
        <Button onClick={joinuser} sx={{ mt: 2 }}>
          Join AS User
        </Button>
      </Paper>
    </Container>
  );
}

export default LoginWorker;
