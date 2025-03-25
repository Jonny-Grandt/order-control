
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 }, // Responsive padding
          mt: '64px', // AppBar height
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
