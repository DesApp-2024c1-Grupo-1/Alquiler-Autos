import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  InputAdornment,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AlquilerStatus } from './AlquilerStatus';
import { PaymentModal } from './PagoModal';
import { PaymentHistoryModal } from './PagoHistoryModal';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function AlquilerList({alquileres}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'car' | 'client'>('all');
  const [selectedAlquiler, setSelectedAlquiler] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const alquileresOrdenados = alquileres;

  const filteredAlquilers = alquileresOrdenados.filter((alquiler) => {
    if (searchTerm === '') return true;
    
    switch (filterType) {
      case 'car':
        return alquiler.car?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               alquiler.car?.patente.toLowerCase().includes(searchTerm.toLowerCase());
      case 'client':
        return alquiler.cliente?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
               alquiler.cliente?.documento.includes(searchTerm);
      default:
        return true;
    }
  });

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'car' | 'client')}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="car">Por Vehículo</MenuItem>
            <MenuItem value="client">Por Cliente</MenuItem>
          </Select>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <DirectionsCarIcon fontSize="small" />
                  Vehículo
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PersonIcon fontSize="small" />
                  Cliente
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayIcon fontSize="small" />
                  Período
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon fontSize="small" />
                  Estado
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AttachMoneyIcon fontSize="small" />
                  Montos
                </Box>
              </TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAlquilers.map((alquiler) => (
              <TableRow key={alquiler.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={alquiler.car.image}
                      alt={alquiler.car.name}
                      sx={{
                        height: 40,
                        width: 64,
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="body1">{alquiler.car?.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {alquiler.car.patente}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{alquiler.cliente?.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {alquiler.cliente?.documento}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {formatDate(alquiler.fechaRetiro)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    hasta {formatDate(alquiler.fechaDevolucion)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <AlquilerStatus alquiler={alquiler} />
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    Total: {formatCurrency(alquiler.precioFinal)}
                  </Typography>
                  <Typography variant="body2" color="error">
                    Pendiente: {formatCurrency(alquiler.saldoPendiente)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      disabled={alquiler.saldoPendiente === 0}
                      variant="contained"
                      size="small"
                      startIcon={<AttachMoneyIcon />}
                      onClick={() => {
                        setSelectedAlquiler(alquiler);
                        setIsPaymentModalOpen(true);
                      }}
                    >
                      Pagar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => {
                        setSelectedAlquiler(alquiler);
                        setIsHistoryModalOpen(true);
                      }}
                    >
                      Pagos
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedAlquiler && (
        <>
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            alquiler={selectedAlquiler}
          />
          <PaymentHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            alquiler={selectedAlquiler}
          />
        </>
      )}
    </Container>
  );
}