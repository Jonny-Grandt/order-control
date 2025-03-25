
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const MainLayout = () => {
  console.log("Rendering MainLayout");
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      <Navbar />
      {/* We don't need to add extra styling here since the Navbar component
          already includes the content wrapper with proper spacing */}
      <Outlet />
    </Box>
  );
};

export default MainLayout;
