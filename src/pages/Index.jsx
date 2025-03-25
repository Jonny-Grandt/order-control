
import React, { useEffect } from 'react';
import { Box, Typography, Button, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  console.log("Rendering Index page");
  
  // Automatically navigate to the login page after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
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
          Welcome to the CleanPro management portal. You are being redirected to the login page...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress size={24} sx={{ mr: 2 }} />
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/')}
          >
            Go to Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Index;
