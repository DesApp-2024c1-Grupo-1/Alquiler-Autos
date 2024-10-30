import React from 'react';
import { Chip } from '@mui/material';
import type { Alquiler } from '../../models/interfaces';

export function AlquilerStatus({ alquiler }: { alquiler: Alquiler }) {
  const now = new Date();
  const startDate = new Date(alquiler.fechaRetiro);
  const endDate = new Date(alquiler.fechaDevolucion);

  let status: 'A retirar' | 'Retirado' | 'Devuelto';
  let color: 'warning' | 'success' | 'default';

  if (now < startDate) {
    status = 'A retirar';
    color = 'warning';
  } else if (now >= startDate && now <= endDate) {
    status = 'Retirado';
    color = 'success';
  } else {
    status = 'Devuelto';
    color = 'default';
  }

  return (
    <Chip
      label={status}
      color={color}
      size="small"
    />
  );
}