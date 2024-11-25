import { Button} from '@mobiscroll/react';


export function BotonPago({setTooltipOpen, setAppointmentPago}) {
    return <Button color="success" className="mds-tooltip-button" onClick={() => {setTooltipOpen(false);  setAppointmentPago(true);}}>Pago</Button>
}

