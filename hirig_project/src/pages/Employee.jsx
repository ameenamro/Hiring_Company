import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,Snackbar 
} from "@mui/material";
import { Alert } from '@mui/material';
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Employee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState({
    id: null,
    name: "",
    description: "",
    location: "",
    Email: "",
    number: "",
  });

  const handleAdd = async () => {
    try {
      const newItem = {
        username: selectedItem.name,
        expeience: selectedItem.description,
        email: selectedItem.Email,
        location:"jeruslem",
        number: selectedItem.number,
        receiver:employee._id
      };

      const response = await axios.post(
        `http://localhost:4000/api/v1/jobRES/${id}`,
        newItem
      );
      setShowModal(false);
     console.log("Data fetched successfully:", response.data);
     handleSnackbarOpen('success', 'Form submitted successfully!');

     console.log("Data fetched successfully:", newItem.receiver);

    } catch (error) {
      handleSnackbarOpen('error', 'Error submitting form. Please try again.');

      console.error("Error adding data:", error);
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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem({
      id: null,
      name: "",
      description: "",
      location: "",
      Email: "",
      number: "",
    });
  };

  

  const handleShowAddModal = () => {
    setSelectedItem({
      id: null,
      name: "",
      description: "",
      location: "",
      Email: "",
    });
    setShowModal(true);
  };

  const gradientBackground = {
    marginTop: "150px",
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    alignItems: "center",
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/worker/${id}`
        );
        setEmployee(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" style={gradientBackground}>
       <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Paper
        elevation={3}
        style={{ padding: "20px", maxHeight: "200vh", textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          {employee.username}'s Profile
        </Typography>
        <Typography variant="body1" paragraph>
          Description: {employee.description}
        </Typography>
        <Typography variant="body1" paragraph>
          Contact Number: {employee.number}
        </Typography>
        <Typography variant="body1" paragraph>
          Email: {employee.email}
        </Typography>
        <Typography variant="body1" paragraph>
        profession: {employee.profession}
        </Typography>
        <Typography variant="body1" paragraph>
        expeience:{employee.expeience}
        </Typography>

        <Typography variant="body1">Location: {employee.location}</Typography>
        <Button
          onClick={handleShowAddModal}
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Send Request
        </Button>
      </Paper>

      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogContent>
          <TextField
            label="Email: "
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.Email}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
                Email: e.target.value,
              })
            }
          />
          <TextField
            label="Name:"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.name}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
                name: e.target.value,
              })
            }
          />
          <TextField
            label="description:"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.description}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
                description: e.target.value,
              })
            }
          />

          <TextField
            label="location:"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.location}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
                location: e.target.value,
              })
            }
          />
          <TextField
            label="Number:"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem.number || ""}
            onChange={(e) =>
              setSelectedItem({
                ...selectedItem,
                number: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
          <Button onClick={handleAdd} color="primary">
            SEND
          </Button>
        </DialogActions>
      </Dialog>
     
    </Container>
  );
}

export default Employee;
