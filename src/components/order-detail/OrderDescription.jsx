
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

const OrderDescription = ({ order }) => {
  const { t } = useLanguage();

  return (
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
  );
};

export default OrderDescription;
