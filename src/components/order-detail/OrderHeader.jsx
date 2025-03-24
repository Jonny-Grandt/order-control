
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

const OrderHeader = ({ order, getStatusColor, handleMarkComplete }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/orders')} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h5" component="h1" fontWeight="medium">
              {t('orderNumber')}{order.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(order.type)} • {new Date(order.date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label={t(order.status)} 
            sx={{ 
              backgroundColor: getStatusColor(order.status), 
              color: 'white',
              fontWeight: 'medium',
              px: 1
            }} 
          />
          
          {order.status !== 'completed' && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircle />}
              onClick={handleMarkComplete}
            >
              {t('markAsComplete')}
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderHeader;
