
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Button,
  useTheme as useMuiTheme
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getOrderById, updateOrderStatus } from '../services/orderService';
import { useLanguage } from '../contexts/LanguageContext';

// Import refactored components
import OrderHeader from './order-detail/OrderHeader';
import ClientInfo from './order-detail/ClientInfo';
import OrderDescription from './order-detail/OrderDescription';
import OrderTabs from './order-detail/OrderTabs';
import MapDialog from './order-detail/MapDialog';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const muiTheme = useMuiTheme();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapOpen, setMapOpen] = useState(false);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const orderData = getOrderById(id);
        if (orderData) {
          setOrder(orderData);
        } else {
          navigate('/orders');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [id, navigate]);
  
  const handleMarkComplete = async () => {
    if (!order) return;
    
    try {
      const updatedOrder = updateOrderStatus(order.id, 'completed');
      if (updatedOrder) {
        setOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'inProgress':
        return muiTheme.palette.warning.main;
      case 'completed':
        return muiTheme.palette.success.main;
      case 'cancelled':
        return muiTheme.palette.error.main;
      default:
        return muiTheme.palette.info.main;
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!order) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Order not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/orders')} sx={{ mt: 2 }}>
          Back to Orders
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Header section */}
      <OrderHeader 
        order={order} 
        getStatusColor={getStatusColor} 
        handleMarkComplete={handleMarkComplete} 
      />
      
      {/* Content section */}
      <Grid container spacing={2} sx={{ maxWidth: '100%', mx: 'auto' }}>
        {/* Left sidebar - stack vertically on mobile */}
        <Grid item xs={12} md={4}>
          <ClientInfo order={order} onOpenMap={() => setMapOpen(true)} />
          <OrderDescription order={order} />
        </Grid>
        
        {/* Main content area */}
        <Grid item xs={12} md={8}>
          <OrderTabs orderId={order.id} />
        </Grid>
      </Grid>
      
      {/* Map Dialog */}
      <MapDialog 
        open={mapOpen} 
        onClose={() => setMapOpen(false)} 
        address={order.address}
        coordinates={order.coordinates}
      />
    </Box>
  );
};

export default OrderDetail;
