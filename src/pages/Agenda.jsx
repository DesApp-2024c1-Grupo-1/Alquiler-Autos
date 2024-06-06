import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Grid, Stack } from '@mui/material';
import { Buscador } from '../components/Buscador';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(patente, color, modelo, combustible, eliminar) {
    return {
      patente,
      color,
      modelo,
      combustible,
      eliminar,
      history: [
        {
          date: '2020-01-05',
          lugarRetiro: 'Av. Libertador 2345',
          lugarDevolucion: '----------',
          horario:'9:00'
        },
        {
          date: '2020-01-02',
          lugarRetiro: '----------',
          lugarDevolucion: 'General Belgrano 3456',
          horario:'10:00'
        },
      ],
    };
  }

function Agenda() {
    return (
            <Container sx={{backgroundColor:"#B3D0FB", pb:10, borderRadius:3}}>
            <Grid  
                    sx={{ display: 'flex',
                    flexDirection: 'column', 
                    alignItems: '',
                    pt:10
                    }}>

                <Buscador sx={{ mx: 20, my: 20}} />

                <Grid sx={{mt:10}}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Patente</TableCell>
                                <TableCell align="right">Color</TableCell>
                                <TableCell align="right">Modelo</TableCell>
                                <TableCell align="right">Combustible</TableCell>
                                <TableCell align="right">Eliminar Reserva</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <Row key={row.patente} row={row} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            </Container>
    );
}

export default Agenda;






function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.patente}
        </TableCell>
        <TableCell align="right">{row.color}</TableCell>
        <TableCell align="right">{row.modelo}</TableCell>
        <TableCell align="right">{row.combustible}</TableCell>
        <TableCell align="right">
          <IconButton>
            <DeleteIcon />
          </IconButton>      
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Lugar Retiro</TableCell>
                    <TableCell align="right">Lugar Devolución</TableCell>
                    <TableCell align="right">Horario</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.lugarRetiro}</TableCell>
                      <TableCell align="right">{historyRow.lugarDevolucion}</TableCell>
                      <TableCell align="right">{historyRow.horario}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    color: PropTypes.string.isRequired,
    combustible: PropTypes.string.isRequired,
    modelo: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    patente: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('ABC123', 'Rojo', 'Fiat 147', 'Nafta', 5.0, 3.99),
  createData('ABC123', 'Azul', 'Chevrolet Corsa', 'Electrico', 4.3, 4.99),
  createData('ABC123', 'Verde', 'Ford Falcon', 'Nafta', 6.0, 3.79),
  createData('ABC123', 'Blanco', 'Peugeot 206', 'Nafta', 4.3, 2.5),
  createData('ABC123', 'Gris', 'Renault Clio', 'Nafta', 3.9, 1.5),
];

//createData('ABC123', 'Rojo', 'Fiat 147', 'Manual', 'Nafta', capacidad),

