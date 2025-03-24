
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getOrderById, updateOrderStatus, Order } from '../services/orderService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme as useMuiTheme } from '@mui/material/styles';

// Import refactored components
import OrderHeader from './order-detail/OrderHeader';
import ClientInfo from './order-detail/ClientInfo';
import OrderDescription from './order-detail/OrderDescription';
import OrderTabs from './order-detail/OrderTabs';
import MapDialog from './order-detail/MapDialog';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const muiTheme = useMuiTheme();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapOpen, setMapOpen] = useState(false);
  
  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const orderData = getOrderById(id);
        if (orderData) {
          setOrder(orderData);
        } else {
          // Handle case where order is not found
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
  
  // Mark order as complete
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
  
  // Get status color
  const getStatusColor = (status: Order['status']) => {
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
    <Box sx={{ flexGrow: 1 }}>
      {/* Header section */}
      <OrderHeader 
        order={order} 
        getStatusColor={getStatusColor} 
        handleMarkComplete={handleMarkComplete} 
      />
      
      {/* Content section */}
      <Grid container spacing={3}>
        {/* Left sidebar */}
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
