
import React from 'react';
import { Box } from '@mui/material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: { xs: 2, md: 3 } }}> {/* Responsive padding */}
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
