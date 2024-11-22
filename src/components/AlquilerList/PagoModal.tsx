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
import { formatCurrency } from '../../utils/formatters';
import { registrarPago } from '../../services/EventosService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  alquiler: any;
}

export function PaymentModal({ isOpen, onClose, alquiler }: PaymentModalProps) {
  const [amount, setAmount] = useState<string>("0");
  const [rawAmount, setRawAmount] = useState<string>("0"); // Para manejar la entrada sin formateo
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const initialAmount = alquiler.saldoPendiente.toFixed(2).replace(".", ","); // Inicializa con el saldo pendiente formateado como string
    setAmount(formatCurrency(alquiler.saldoPendiente));
    setRawAmount(initialAmount);
  }, [isOpen]);

  const parseToNumber = (value: string): number => {
    return parseFloat(value.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, ""));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d.,]/g, ""); // Permitir solo números, comas y puntos
    setRawAmount(rawValue);

    const numericValue = parseToNumber(rawValue);

    if (!isNaN(numericValue)) {
      if (numericValue > alquiler.saldoPendiente) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  const handleBlur = () => {
    // Formatear al salir del campo de texto
    const numericValue = parseToNumber(rawAmount);
    setAmount(formatCurrency(numericValue));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = parseToNumber(rawAmount); // Convierte el valor formateado a número
    const nuevoPago = await registrarPago(alquiler.id, numericAmount);
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
            <Typography variant="h6">{formatCurrency(alquiler.precioFinal)}</Typography>
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
            value={rawAmount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
            helperText={error ? `El monto no puede exceder ${formatCurrency(alquiler.saldoPendiente)}` : ""}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={error || parseToNumber(rawAmount) <= 0}>
            Confirmar Pago
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}