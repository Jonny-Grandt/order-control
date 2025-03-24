
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  Typography
} from '@mui/material';
import {
  Schedule
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import { Order } from '../../services/orderService';

interface OrderDescriptionProps {
  order: Order;
}

const OrderDescription = ({ order }: OrderDescriptionProps) => {
  const { t } = useLanguage();

  return (
    <Card sx={{ borderRadius: 3, mt: 3 }}>
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
  );
};

export default OrderDescription;
