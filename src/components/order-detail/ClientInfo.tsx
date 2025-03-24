
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Typography
} from '@mui/material';
import {
  Business,
  Email,
  Phone,
  LocationOn,
  Map as MapIcon
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import { Order } from '../../services/orderService';

interface ClientInfoProps {
  order: Order;
  onOpenMap: () => void;
}

const ClientInfo = ({ order, onOpenMap }: ClientInfoProps) => {
  const { t } = useLanguage();

  return (
    <Card sx={{ borderRadius: 3, height: '100%' }}>
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
                  onClick={onOpenMap}
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
  );
};

export default ClientInfo;
