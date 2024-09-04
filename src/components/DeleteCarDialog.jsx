import { deleteCarById } from "../services/CarsService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { blueGrey } from '@mui/material/colors';

export default function DeleteCarDialog({  car, deleteCarFromHome }) {

    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleCloseSnack = () => {
      setOpenSnack(false)
    }
  
    const confirmDelete = async (car) => {
        const deletedCar = await deleteCarById(car.id)
        deleteCarFromHome(deletedCar)
        setOpenSnack(true);
    }

    return (
        <>
             <Button variant="outlined" size="small" color="inherit" endIcon={<DeleteIcon />} sx={{ mr: 2, color: blueGrey[700] }} onClick={() => handleClickOpen(car.id)}>
                Borrar
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Seguro que desea eliminar este vehiculo?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Estas por eliminar {car.brand} {car.name} {car.patente} <br></br>
                        Esta accion no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={
                        () => {
                            confirmDelete(car);
                            handleClose();
                        }
                    } autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert
                    onClose={handleCloseSnack}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Auto eliminado con exito
                </Alert>
            </Snackbar>
        </>
    )
}