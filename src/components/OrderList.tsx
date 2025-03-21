
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  useTheme as useMuiTheme,
  CircularProgress,
  TablePagination
} from '@mui/material';
import { Search, Visibility, FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getOrders, searchOrders, Order } from '../services/orderService';

const OrderList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Load orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = getOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const results = searchOrders(searchQuery);
      setFilteredOrders(results);
    }
    setPage(0); // Reset to first page when searching
  }, [searchQuery, orders]);
  
  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
  
  // View order details
  const handleViewOrder = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };
  
  // Currently displayed orders (pagination)
  const displayedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom fontWeight="medium">
          {t('orders')}
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 3 }}>
          <TextField
            fullWidth
            placeholder={t('search')}
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2 }}
          />
          
          <Tooltip title="Filter">
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('orderNumber')}</TableCell>
                    <TableCell>{t('client')}</TableCell>
                    <TableCell>{t('location')}</TableCell>
                    <TableCell>{t('type')}</TableCell>
                    <TableCell>{t('status')}</TableCell>
                    <TableCell>{t('date')}</TableCell>
                    <TableCell align="right">{t('actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedOrders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          #{order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{order.clientName}</TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography variant="body2" noWrap>
                          {order.address}
                        </Typography>
                      </TableCell>
                      <TableCell>{t(order.type)}</TableCell>
                      <TableCell>
                        <Chip 
                          size="small"
                          label={t(order.status)} 
                          sx={{ 
                            backgroundColor: getStatusColor(order.status), 
                            color: 'white' 
                          }} 
                        />
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <Tooltip title={t('viewDetails')}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleViewOrder(order.id)}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {displayedOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                        <Typography>No orders found</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default OrderList;
