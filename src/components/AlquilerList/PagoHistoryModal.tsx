import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Divider,
  List,
  ListItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface PaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  alquiler: any;
}

export function PaymentHistoryModal({ isOpen, onClose, alquiler }: PaymentHistoryModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Historial de Pagos
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <List>
          <ListItem sx={{ justifyContent: 'space-between', color: 'text.secondary' }}>
            <Typography>Fecha</Typography>
            <Typography>Monto</Typography>
          </ListItem>
          
          <Divider />
          
          {alquiler.pagos.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
              <Typography>No hay pagos registrados</Typography>
            </Box>
          ) : (
            alquiler.pagos.map((pago, index) => (
              <ListItem key={index} sx={{ justifyContent: 'space-between' }}>
                <Typography>{formatDate(pago.fecha)}</Typography>
                <Typography fontWeight="medium">
                  {formatCurrency(pago.monto)}
                </Typography>
              </ListItem>
            ))
          )}

          <Divider sx={{ my: 2 }} />

          <ListItem sx={{ justifyContent: 'space-between' }}>
            <Typography fontWeight="medium">Total Pagado</Typography>
            <Typography fontWeight="medium">
              {formatCurrency(alquiler.precioFinal - alquiler.saldoPendiente)}
            </Typography>
          </ListItem>
          
          <ListItem sx={{ justifyContent: 'space-between' }}>
            <Typography fontWeight="medium" color="error">
              Saldo Pendiente
            </Typography>
            <Typography fontWeight="medium" color="error">
              {formatCurrency(alquiler.saldoPendiente)}
            </Typography>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}