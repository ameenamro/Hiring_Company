import React, { useEffect, useState } from "react";
import { Typography, Container, Paper, Avatar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/worker/"
        );
        setUsers(response.data);
        console.log("Data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const gradientBackground = {
    marginTop: "150px",
  };

  const buttonStyles = {
    marginRight: "8px",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const handleAccept = (userId) => {
    // Implement the logic for accepting a user with the provided userId
    console.log(`Accepted user with ID: ${userId}`);
  };

  const handleReject = (userId) => {
    // Implement the logic for rejecting a user with the provided userId
    console.log(`Rejected user with ID: ${userId}`);
  };

  return (
    <Container style={gradientBackground} sx={{ mt: 2 }}>
      {users.map((userData, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{ padding: 3, textAlign: "center", marginBottom: 2 }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {userData.username}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Email: {userData.email}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 16 }}>
            Role: {userData.role}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/Employee/${userData._id}`}
          >
            Open Profile
          </Button>
        </Paper>
      ))}
    </Container>
  );
}

export default User;
