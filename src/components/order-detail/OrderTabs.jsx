
import React from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import TabPanel from './TabPanel';
import MaterialsLog from '../MaterialsLog';
import TimeLog from '../TimeLog';
import WorkDiary from '../WorkDiary';
import OrderPhotos from '../OrderPhotos';
import { useLanguage } from '../../contexts/LanguageContext';

const OrderTabs = ({ orderId }) => {
  const { t } = useLanguage();
  const [tabValue, setTabValue] = React.useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper sx={{ borderRadius: 3, maxWidth: '100%' }}>
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTabs-indicator': {
            height: 3,
          }
        }}
      >
        <Tab label={t('materials')} id="order-tab-0" />
        <Tab label={t('timeLog')} id="order-tab-1" />
        <Tab label={t('workDiary')} id="order-tab-2" />
        <Tab label={t('photos')} id="order-tab-3" />
      </Tabs>
      
      <Box sx={{ px: 3, maxWidth: '100%' }}>
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
