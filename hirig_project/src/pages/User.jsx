import React, { useEffect, useState } from "react";
import { Typography, Container, Paper, Button, Snackbar, TextField, Alert,Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../companantCSS/User.css";

function User({ isLoggedInToken, setIsLoginToken }) {
  const [users, setUsers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/worker/");
        setUsers(response.data);
        console.log("Data fetched successfully:", response.data);
        console.log(isLoggedInToken);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const GETservce = (loc) => {
    if (isLoggedInToken !== "token") {
      navigate(`/Employee/${loc}`);
    } else {
      handleSnackbarOpen("error", "You need to sign in to perform that action.");
    }
  };

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cont">
      <Container
        style={{
          marginTop: "160px",
          marginBottom:"45px",
          position:"relative",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <TextField
          sx={{ alignSelf: "flex-start", marginRight: "60px" }}
          label="Search"
          variant="outlined"
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row", // Set the direction to row
            flexWrap: "wrap", // Allow items to wrap to the next line
            marginTop: "20px",
          }}
        >
          {filteredUsers.map((userData, index) => (
            <Paper
              key={index}
              className="paper" // Use the new CSS class

              style={{
                position:"relative",

                borderRadius: "120px",
                maxWidth: "230px",
                width: "100%",
                textAlign: "center",
                margin: "20px 7px", // Adjust the margin here
              }}
              elevation={20}
              sx={{ mt: 15 }}
            >
            <Avatar alt={"sa"} src={""} sx={{ width: 100, height: 100 }} />

              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                {userData.username}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Email: {userData.email}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Role: {userData.role}
              </Typography>
              <Button
                style={{
                  borderRadius: "50px",
                  padding: "10px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                variant="contained"
                color="primary"
                onClick={() => GETservce(userData._id)}
              >
                Open Profile
              </Button>
            </Paper>
          ))}
        </div>
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
      </Container>
    </div>
  );
}

export default User;
