import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
} from "@mui/material";

function EmployeeProfile() {
  const { id } = useParams();
  
  const [employee, setEmployee] = useState(null);
  const [missions, setMissions] = useState([]);
  const [image, setImage] = useState("");
  const [imageEmploee, setimageEmploee] = useState(null);


  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/worker/${id}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  useEffect(() => {
    const ImageProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/worker/uploadphoto/${id}`
        );
          // Assuming userProfile has a property like 'imageUrl'
          setimageEmploee(response.data);
        console.log("Photo uploaded successfully", imageEmploee);
        // Reload the employee data after a successful upload
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    };
    ImageProfile();
  }, [id]);

  
useEffect(() => {
  console.log("Photo uploaded successfully", imageEmploee);

  
}, [imageEmploee]);





  useEffect(() => {
    const fetchMissionsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/jobRES/${id}`
        );
        setMissions(response.data);
      } catch (error) {
        console.error("Error fetching missions data:", error);
      }
    };

    fetchMissionsData();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }
  const handleAddPhoto = (event) => {
    const input = document.createElement("input");
    input.type = "file";

    input.addEventListener("change", async (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setImage(imageUrl);
        const formData = new FormData();
        formData.append("image", selectedFile);
        
        try {
          const response = await axios.post(
            `http://localhost:4000/api/v1/worker/uploadphoto/${employee._id}`,
            formData,
            
          );
          console.log("Photo uploaded successfully", response.data);
          console.log("hhgy");

          // Reload the employee data after a successful upload
        } catch (error) {
          console.error("Error uploading photo:", error);
        }
      }
    });

    input.click();
  };
  const handleSendRequest=(e)=>
  {


  }
  const handleReject=async (e)=>
  {
console.log(e);
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/jobRES/${e}`
    );
    location.reload();

  } catch (error) {
    console.error("Error fetching missions data:", error);
  };



  }  

  return (
    <Container maxWidth="md" style={{ marginTop: "100px",padding: "40px", borderRadius:"70px"}}>
      <Paper elevation={24} style={{ padding: "20px" ,borderRadius:"70px", } }>
        <Typography variant="h4" gutterBottom>
          {employee.username}'s Profile
        </Typography>
        <Card>
          <CardMedia
            component="img"
            alt={employee.username}
            style={{
              maxHeight: "200px",
              maxWidth: "200px",
              objectFit: "cover",
              borderRadius: "120px",
              marginBottom: "10px",
            }}
            src={ image}
          />
          <CardContent>
            <Typography variant="body1" paragraph>
              <strong>Description:</strong> {employee.description}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Contact Number:</strong> {employee.number}
            </Typography>
            <Typography variant="body1">
              <strong>Location:</strong> {employee.location}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {employee.email}
            </Typography>
            <Typography variant="body1">
              <Button
                type="button"
                onClick={handleAddPhoto}
                style={{ marginTop: "10px" }}
              >
                Add Photo
              </Button>
            </Typography>
          </CardContent>
        </Card>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          Jobs and Tasks:
        </Typography>
        {missions && missions.length > 0 ? (
          <Grid container spacing={2}>
            {missions.map((mission, index) => (
              <Grid item xs={12} key={index}>
                <Paper
                  style={{
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography variant="body1">
                      <strong>Username:</strong> {mission.username}
                      <br />
                      <strong>Number:</strong> {mission.number}
                      <br />
                      <strong>Location:</strong> {mission.location}
                      <br />
                      <strong>Email:</strong> {mission.email}
                      <br />
                      <strong>Description:</strong> {mission.description}
                      <br />
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{width:"140px"}}
                    onClick={() => handleSendRequest(mission.id)}
                  >
                    Send Request
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{height:"65px", padding:"32px", backgroundColor:"red"}}
                    onClick={() => handleReject(mission._id)}
                  >
                    Reject
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No jobs or tasks assigned.</Typography>
        )}
      </Paper>
    </Container>
  );
}

export default EmployeeProfile;
