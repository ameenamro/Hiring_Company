import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function LoginWorker({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("ameen");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [user, setuser] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const gradientBackground = {
    background: "linear-gradient(to right, #e6e8ee, rgb(237, 237, 237)",
    padding: "15px",
    marginTop: "150px",
    borderRadius: "10px",
  };
  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setUsername("");
  };
  const joinuser = () => {
    navigate("/Login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (confirmPassword !== password) {
        window.alert("please enter the same pasword");
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
            "http://localhost:4000/api/v1/worker/register",
            newRigaster
          );
          setuser(response.data);
          setIsLoggedIn(true);
          console.log("Data fetched successfully:", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
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
          "http://localhost:4000/api/v1/worker/login",
          newlogin
        );
        setuser(response.data);
        setIsLoggedIn(true);

        console.log("Data fetched successfully:", response.data);
      } catch (error) {
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
          Join like User
        </Button>
      </Paper>
    </Container>
  );
}

export default LoginWorker;
