import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function EmployeeProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [Massions, setMassions] = useState("");
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/worker/${id}`);
        setEmployee(response.data);
        console.log('Error fetching employee data:', response.data);

      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/jobRES/${id}`);
        setMassions(response.data);
        console.log('Error fetching employee data:', response.data);

      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);












  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '150px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          {employee.username}'s Profile
        </Typography>
        <Card>
          <CardMedia
            component="img"
            alt={employee.username}
            height="140"
            image={employee.image}  // Replace with the actual field storing the image URL
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
            </CardContent>
          
        </Card>
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Jobs and Tasks:
        </Typography>
        {Massions && Massions.length > 0 ? (
          <List>
            {Massions.map((job, index) => (
              <ListItem key={index}>
                <ListItemText primary={job.number} secondary={job.description} />
                <Button variant="contained" color="primary" onClick={() => handleSendRequest(job.id)}>
                  Send Request
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No jobs or tasks assigned.</Typography>
        )}
      </Paper>
    </Container>
  );
}

export default EmployeeProfile;
