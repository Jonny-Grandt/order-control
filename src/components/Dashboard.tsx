
import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  useTheme as useMuiTheme
} from '@mui/material';
import { 
  Assignment, 
  CheckCircle, 
  Pending, 
  DateRange, 
  KeyboardArrowRight,
  Business,
  LocationOn
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getOrders, Order } from '../services/orderService';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  
  // Get recent orders
  const orders = getOrders();
  const recentOrders = orders.slice(0, 3); // Show 3 most recent orders
  
  // Stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const inProgressOrders = orders.filter(order => order.status === 'inProgress').length;
  
  // Status color mapping
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
  
  // Type icon mapping
  const getTypeIcon = (type: Order['type']) => {
    return <Assignment color="primary" />;
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Welcome banner */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {t('welcome')}, {user?.name}!
            </Typography>
            <Typography variant="subtitle1">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Paper>
        </Grid>
        
        {/* Stats cards */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography color="text.secondary" gutterBottom>
                  {t('orderCount')}
                </Typography>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Assignment />
                </Avatar>
              </Box>
              <Typography variant="h4" component="div" fontWeight="bold">
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography color="text.secondary" gutterBottom>
                  {t('completedOrders')}
                </Typography>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <CheckCircle />
                </Avatar>
              </Box>
              <Typography variant="h4" component="div" fontWeight="bold">
                {completedOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography color="text.secondary" gutterBottom>
                  {t('inProgress')}
                </Typography>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Pending />
                </Avatar>
              </Box>
              <Typography variant="h4" component="div" fontWeight="bold">
                {inProgressOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardHeader 
              title={t('recentOrders')}
              action={
                <Button 
                  endIcon={<KeyboardArrowRight />}
                  onClick={() => navigate('/orders')}
                >
                  {t('viewAll')}
                </Button>
              }
            />
            <Divider />
            <List>
              {recentOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem 
                    button 
                    onClick={() => navigate(`/orders/${order.id}`)}
                    secondaryAction={<KeyboardArrowRight />}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {getTypeIcon(order.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {t('orderNumber')}{order.id}
                          </Typography>
                          <Chip 
                            size="small" 
                            label={t(order.status)} 
                            sx={{ 
                              backgroundColor: getStatusColor(order.status), 
                              color: 'white',
                              fontWeight: 'medium'
                            }} 
                          />
                        </Box>
                      }
                      secondary={
                        <Grid container spacing={1} sx={{ mt: 0.5 }}>
                          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Business fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                            <Typography variant="body2">{order.clientName}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOn fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                            <Typography variant="body2" noWrap>{order.address}</Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
              {recentOrders.length === 0 && (
                <ListItem>
                  <ListItemText 
                    primary={<Typography variant="body1" align="center">No orders available</Typography>} 
                  />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
