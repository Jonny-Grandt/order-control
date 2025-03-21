
import React from 'react';
import { Box } from '@mui/material';

const Map = ({ lat, lng }) => {
  // In a real app, you would integrate with Google Maps API
  // For now, we'll just show an iframe with Google Maps
  
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBhKzKwzAKONJlKUJKDY0-yjxwpBmtLck0&q=${lat},${lng}&zoom=15`;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <iframe
        title="Location Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src={mapUrl}
        allowFullScreen
      />
    </Box>
  );
};

export default Map;
