
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme
} from '@mui/material';
import TabPanel from './TabPanel.jsx';
import MaterialsLog from '../MaterialsLog.tsx';
import TimeLog from '../TimeLog.tsx';
import WorkDiary from '../WorkDiary.tsx';
import OrderPhotos from '../OrderPhotos.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

const OrderTabs = ({ orderId }) => {
  console.log("Rendering OrderTabs component with orderId:", orderId);
  const { t } = useLanguage();
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper sx={{ 
      borderRadius: 3, 
      maxWidth: '100%',
      overflow: 'hidden' // Prevent overflow
    }}>
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons={isMobile ? "auto" : false}
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTabs-indicator': {
            height: 3,
          },
          '& .MuiTab-root': {
            minWidth: isMobile ? '80px' : '120px', // Make tabs narrower on mobile
            px: isMobile ? 1 : 2,
          }
        }}
      >
        <Tab label={t('materials')} id="order-tab-0" />
        <Tab label={t('timeLog')} id="order-tab-1" />
        <Tab label={t('workDiary')} id="order-tab-2" />
        <Tab label={t('photos')} id="order-tab-3" />
      </Tabs>
      
      <Box sx={{ 
        px: { xs: 1, sm: 2, md: 3 }, // Responsive padding
        maxWidth: '100%'
      }}>
        <TabPanel value={tabValue} index={0}>
          <MaterialsLog orderId={orderId} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <TimeLog orderId={orderId} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <WorkDiary orderId={orderId} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <OrderPhotos orderId={orderId} />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default OrderTabs;
