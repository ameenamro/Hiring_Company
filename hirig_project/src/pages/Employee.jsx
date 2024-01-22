import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Paper, Container } from '@mui/material';

function Employee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const gradientBackground = {
    marginTop: "150px",
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/worker/${id}`);
        setEmployee(response.data);
        console.log(response.data);
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
    <Container maxWidth="lg" style={ gradientBackground}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          {employee.username}'s Profile
        </Typography>
        <Typography variant="body1" paragraph>
          Description: {employee.description}
        </Typography>
        <Typography variant="body1" paragraph>
          Contact Number: {employee.number}
        </Typography>
        <Typography variant="body1">
          Location: {employee.location}
        </Typography>
        {/* Add more details as needed */}
      </Paper>
    </Container>
  );
}

export default Employee;
