export function formatearDateTime(fecha) {
    const date = new Date(fecha);
    const formatter = new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
    const formattedDate = formatter.format(date);
    return formattedDate;

}

