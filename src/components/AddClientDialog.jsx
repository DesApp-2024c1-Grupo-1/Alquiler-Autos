import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editCliente } from "../store/alquilerFormSlice.js";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { set } from 'lodash';
import {registrarAlquiler} from '../services/AlquilerService.js'


function AddClientDialog({validated}) {
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
    
    const alquiler = useSelector(state => state.alquiler);

    function validarCampos() {
        return validarNombre() && validarDocumento() & validarTelefono()
    }

    const validarNombre = (value = "") => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ´ ]+$/; //Solo letras, espacios y tildes (obligatorio al menos un carácter)
        if (!value) {
          setErrorNombre({ error: true, message: "El nombre no puede estar vacío" });
          return false;
        } else if (!regex.test(value)) {
          setErrorNombre({ error: true, message: "El nombre solo puede contener letras y tildes" });
          return false;
        } else if (value.length < 4) {
          setErrorNombre({ error: true, message: "El nombre debe tener al menos 4 caracteres" });
          return false;
        } else {
          setErrorNombre({ error: false, message: "" });
          return true;
        }
    };
  
    const validarDocumento = (value = "") => {
        const regex = /^[a-zA-Z0-9]+$/; //Solo letras y números (obligatorio al menos un carácter)
        if (!value) {
          setErrorDocumento({ error: true, message: "El documento no puede estar vacío" });
          return false;
        } else if (!regex.test(value)) {
          setErrorDocumento({ error: true, message: "El documento solo puede contener letras y números" });
          return false;
        } else if (value.length < 7) {
          setErrorDocumento({ error: true, message: "El documento debe tener al menos 7 caracteres" });
          return false;
        } else {
          setErrorDocumento({ error: false, message: "" });
          return true;
        }
    };
  
    const validarTelefono = (value = "") => {
        const regex = /^[0-9+]+$/; //Solo números y el símbolo "+"
        if (!value) {
          setErrorTelefono({ error: true, message: "El teléfono no puede estar vacío" });
          return false;
        } else if (!regex.test(value)) {
          setErrorTelefono({ error: true, message: "El teléfono solo puede contener números y el símbolo +" });
          return false;
        } else if (value.length < 7) {
          setErrorTelefono({ error: true, message: "El teléfono debe tener al menos 7 caracteres" });
          return false;
        } else {
          setErrorTelefono({ error: false, message: "" });
          return true;
        }
    };
    //Validar todos los campos antes de enviar
    function validarCampos() {
        const nombreValido = validarNombre(nombre); //Usar el estado `nombre`
        const documentoValido = validarDocumento(documento); //Usar el estado `documento`
        const telefonoValido = validarTelefono(telefono); //Usar el estado `telefono`
  
        return nombreValido && documentoValido && telefonoValido;
    }  

    const handleClickOpen = () => {
        console.log("Validated: " + validated)
        if(validated){
            setOpen(true);
        }
        
    };

    const handleClose = () => {
        setNombre("");
        setDocumento("");
        setTelefono("");
        setSuccess(false);
        setOpen(false);
        

    };


    const sumbit = async (e) => {
        e.preventDefault();
        if (validarCampos()) {
          await editarCliente();
          setSuccess(true);
          setTimeout(() => {
            setOpen(false);
            navigate("/agenda");
          }, 2000);
        } else {
          console.log("No validado");
        }
      };
    
    const editarCliente = async () => {
        const nuevoCliente = {
            nombre: nombre,
            documento: documento,
            telefono: telefono,
            email: email
        }
        await dispatch(editCliente(nuevoCliente));
       
    };
    
    useEffect(() => {
        if (success) {
            botonRegistrar();
        }
    }, [success]); 
    
    const botonRegistrar = () => {
        console.log(alquiler)
        registrarAlquiler(alquiler)
    };

    return (
        <React.Fragment>
            <Button variant="contained" color="success" disabled={!validated} onClick={handleClickOpen}>
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
                        error={errorNombre.error} //Mostrar error si aplica
                        helperText={errorNombre.message} //Mostrar mensaje de error dinámico
                        onChange={(e) => {
                            setNombre(e.target.value); //Actualiza el estado del nombre
                            validarNombre(e.target.value); //Valida el nombre en tiempo real
                        }}
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
                        type="text"
                        error={errorDocumento.error} //Mostrar error si aplica
                        helperText={errorDocumento.message} //Mostrar mensaje de error dinámico
                        onChange={(e) => {
                            setDocumento(e.target.value); //Actualiza el estado del documento
                            validarDocumento(e.target.value); //Valida el documento en tiempo real
                        }}
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
                        type="text"
                        error={errorTelefono.error} //Mostrar mensaje de error dinámico
                        helperText={errorTelefono.message} //Mostrar mensaje de error dinámico
                        onChange={(e) => {
                            setTelefono(e.target.value); //Actualiza el estado del teléfono
                            validarTelefono(e.target.value); //Valida el teléfono en tiempo real
                        }}
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
