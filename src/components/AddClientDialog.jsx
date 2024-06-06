import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editCliente } from "../store/alquilerFormSlice.js";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { set } from 'lodash';


function AddClientDialog() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);

    const [nombre, setNombre] = useState("");
    const [documento, setDocumento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    const [errorNombre, setErrorNombre] = useState({ error: false, message: "", });
    const [errorDocumento, setErrorDocumento] = useState({ error: false, message: "", });
    const [errorTelefono, setErrorTelefono] = useState({ error: false, message: "", });

    const dispatch = useDispatch();
    const cliente = useSelector(state => state.alquiler.cliente);

    function validarCampos() {
        return validarNombre() && validarDocumento() & validarTelefono()
    }

    async function validarNombre() {
        if (nombre.length > 3) {
            setErrorNombre({ error: false, message: "" })
            return true;
        } else {
            setErrorNombre({ error: true, message: "El nombre debe tener al menos 4 caracteres" });
            return false;
        }
    }

    function validarDocumento() {
        if (documento.length >= 7) {
            setErrorDocumento({ error: false, message: "" })
            return true;
        } else {
            setErrorDocumento({ error: true, message: "El documento debe tener al menos 7 caracteres" });
            console.log("errorDocumento", errorDocumento)
            return false;
        }
    }

    function validarTelefono() {
        if (telefono.length >= 7) {
            setErrorTelefono({ error: false, message: "" })
            return true;
        } else {
            setErrorTelefono({ error: true, message: "El telefono debe tener al menos 7 caracteres" });
            console.log("errorTelefono", errorTelefono)
            return false;
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setNombre("");
        setDocumento("");
        setTelefono("");
        setSuccess(false);
        setOpen(false);
        console.log("Cerrado solo")
        // useNavigate("/home")

    };

    const sumbit = (e) => {
        e.preventDefault();
        if (validarCampos()) {
            const nuevoCliente = {
                nombre: nombre,
                documento: documento,
                telefono: telefono,
                email: email
            }
            dispatch(editCliente(nuevoCliente));
            setSuccess(true);
            setTimeout(() => {
                setOpen(false);
                setSuccess(false);
                navigate("/agenda")
            }, 2000);

            
        } else {
            console.log("No validado")
        }

    };

    return (
        <React.Fragment>
            <Button variant="contained" color="success" onClick={handleClickOpen}>
                Reservar
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <React.Fragment>
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        Datos del cliente
                        <Button sx={{ color: 'red' }} onClick={handleClose}><CloseIcon></CloseIcon></Button>
                    </DialogTitle>
                </React.Fragment>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="nombre"
                        name="nombre"
                        label="Nombre y Apellido"
                        type="text"
                        error={errorNombre.error}
                        helperText={errorNombre.message}
                        onChange={(e) => { setNombre(e.target.value) }}
                        fullWidth
                        variant="outlined"
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="documento"
                        name="documento"
                        label="Documento"
                        type="number"
                        error={errorDocumento.error}
                        helperText={errorDocumento.message}
                        onChange={(e) => { setDocumento(e.target.value) }}
                        fullWidth
                        variant
                        ="outlined"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="telefono"
                        name="telefono"
                        label="Telefono"
                        type="number"
                        error={errorTelefono.error}
                        helperText={errorTelefono.message}
                        onChange={(e) => { setTelefono(e.target.value) }}
                        fullWidth
                        variant
                        ="outlined"
                    />
                    <TextField
                        autoFocus
                        // required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email"
                        type="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                        variant
                        ="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    {!success && <Button hidden={true} disabled={false} type="submit" onClick={sumbit} >Registrar</Button>}
                    {success &&
                        <>
                            <Alert sx={{ display: 'flex', alignSelf: 'center' }} icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="success">
                                Confirmado
                            </Alert>
                            <Snackbar
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                open={success}
                                onClose={handleClose}
                                message="Alquiler registrado"
                                key={{ vertical: 'bottom', horizontal: 'center' }}
                            />
                        </>
                    }

                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddClientDialog;
