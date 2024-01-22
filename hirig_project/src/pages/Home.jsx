
import { CssBaseline, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
const HomePage = () => {
    const gradientBackground = {

        marginTop:"150px",
      };
    return (
      <div>
        <Container
    style={gradientBackground}
          component="section"
          sx={{
            mt: 2,
            mb: 4,
            backgroundColor: '#f0f0f0',
            textAlign: 'center',
            padding: '4rem 0',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Find Your Dream Job with Us
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Browse through our latest job listings and take the next step in your career.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Browse Jobs
          </Button>
        </Container>
  
        {/* Job Listings Section */}
        <Container component="section" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Latest Job Listings
          </Typography>
          <Grid container spacing={3}>
            {/* Example job listings */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Software Engineer</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Full-time, San Francisco, CA
                  </Typography>
                  <Button variant="outlined" color="primary" size="small">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">UX Designer</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Remote, Contract
                  </Typography>
                  <Button variant="outlined" color="primary" size="small">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Marketing Specialist</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Part-time, New York, NY
                  </Typography>
                  <Button variant="outlined" color="primary" size="small">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
  
        {/* Call-to-Action Section */}
        <Container component="section" sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Ready to Post a Job?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join companies that trust us to find the best talent. Post your job today!
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Post a Job
          </Button>
        </Container>
      </div>
    );
  };
  
  export default HomePage;