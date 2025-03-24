import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
  Chip,
  Tab,
  Tabs,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  LocationOn,
  Email,
  Phone,
  Business,
  Schedule,
  Map as MapIcon
} from '@mui/icons-material';
import { 
  getOrderById, 
  updateOrderStatus,
} from '../services/orderService';
import { useLanguage } from '../contexts/LanguageContext';
import MaterialsLog from './MaterialsLog';
import TimeLog from './TimeLog';
import WorkDiary from './WorkDiary';
import OrderPhotos from './OrderPhotos';
import Map from './Map';

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
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const muiTheme = useMuiTheme();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
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
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
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
      
      <Grid container spacing={3} sx={{ maxWidth: '100%', mx: 'auto' }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, height: '100%', maxWidth: '100%' }}>
            <CardHeader 
              title={t('clientInfo')}
              avatar={
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Business />
                </Avatar>
              }
            />
            <Divider />
            <CardContent>
              <List disablePadding>
                <ListItem>
                  <ListItemText 
                    primary={order.clientName} 
                    secondary={t('client')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Email fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                        {order.clientEmail}
                      </Box>
                    } 
                    secondary={t('email')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Phone fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                        {order.clientPhone}
                      </Box>
                    } 
                    secondary={t('phone')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                        {order.address}
                      </Box>
                    } 
                    secondary={
                      <Button 
                        size="small" 
                        startIcon={<MapIcon />} 
                        onClick={() => setMapOpen(true)}
                        sx={{ mt: 1 }}
                      >
                        {t('viewMap')}
                      </Button>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card sx={{ borderRadius: 3, mt: 3, maxWidth: '100%' }}>
            <CardHeader 
              title={t('orderDetails')}
              avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Schedule />
                </Avatar>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {order.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
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
                <MaterialsLog orderId={order.id} />
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <TimeLog orderId={order.id} />
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                <WorkDiary orderId={order.id} />
              </TabPanel>
              
              <TabPanel value={tabValue} index={3}>
                <OrderPhotos orderId={order.id} />
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Dialog 
        open={mapOpen} 
        onClose={() => setMapOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">{order.address}</Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ height: 400, p: 0 }}>
          <Map lat={order.coordinates.lat} lng={order.coordinates.lng} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMapOpen(false)}>{t('close')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetail;
