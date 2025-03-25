
import React from 'react';
import { Box } from '@mui/material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  
  console.log(`TabPanel rendering: value=${value}, index=${index}`);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
