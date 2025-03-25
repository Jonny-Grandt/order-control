
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  console.log("Rendering Index page");
  
  return (
    <Container maxWidth="md" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      py: 4
    }}>
      <Box sx={{ 
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        p: 4,
        textAlign: 'center',
        width: '100%'
      }}>
        <Typography variant="h3" component="h1" gutterBottom>
          CleanPro Portal
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the CleanPro management portal. Please log in to access your dashboard.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default Index;
