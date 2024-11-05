import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  TextField,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { registrarPago } from '../../services/EventosService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  alquiler: any;
}

export function PaymentModal({ isOpen, onClose, alquiler }: PaymentModalProps) {
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setAmount(alquiler.saldoPendiente);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoPago = await registrarPago(alquiler.id, amount);
    alquiler.pagos.push(nuevoPago);
    alquiler.saldoPendiente -= nuevoPago.monto;
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Registrar Pago
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Monto total
            </Typography>
            <Typography variant="h6">
              {formatCurrency(alquiler.precioFinal)}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Saldo pendiente
            </Typography>
            <Typography variant="h6" color="error">
              {formatCurrency(alquiler.saldoPendiente)}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Monto a pagar"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            inputProps={{ max: alquiler.saldoPendiente }}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={amount <= 0}>
            Confirmar Pago
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}