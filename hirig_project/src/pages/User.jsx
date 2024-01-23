import React, { useEffect, useState } from "react";
import { Typography, Container, Paper, Avatar, Button,  Snackbar} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

import axios from "axios";

function User({isLoggedInToken,setIsLoginToken }) {
  const [users, setUsers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/worker/"
        );
        setUsers(response.data);
        console.log("Data fetched successfully:", response.data);
        console.log(isLoggedInToken);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

const GETservce=(loc)=>
  {
if(isLoggedInToken!=="token"){
 navigate(`/Employee/${loc._id}`);
 }
 else
 {
  handleSnackbarOpen("error", "You need to sign in to perform that action.");
}

  }

  const gradientBackground = {
    marginTop: "150px",
  };

  const buttonStyles = {
    marginRight: "8px",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container style={gradientBackground} sx={{ mt: 2 }}>
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
            onClick={() => GETservce(userData._id)}
            >            
            Open Profile
          </Button>
        </Paper>
      ))}
    </Container>
  );
}

export default User;
