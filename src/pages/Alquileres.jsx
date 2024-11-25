import { KeyboardArrowUp } from '@mui/icons-material'; //Icono para el boton
import { Card, CardContent, Fab, Skeleton, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import faviconAlquileres from '../assets/faviconAlquileres.png';
import { AlquilerList } from '../components/AlquilerList/AlquilerList';
import { useAlquileres } from '../services/ListaDeAlquileresService';

export function AlquileresPage() {
    const allAlquileres = useAlquileres();
    const [isLoading, setIsLoading] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = faviconAlquileres;
        document.head.appendChild(favicon);

        return () => {
            favicon.href = '/favicon.ico';
        };
    }, []);

    useEffect(() => {
        if (allAlquileres.length > 0) {
            setIsLoading(false);
        }
    }, [allAlquileres]);

    const alquileresOrdenados = useMemo(() => {
        return allAlquileres.sort((a, b) => new Date(a.fechaRetiro) - new Date(b.fechaRetiro));
    }, [allAlquileres]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function compararFechas(fechaRetiro, fechaDevolucion) {
        const actual = new Date();
        const retiro = new Date(fechaRetiro);
        const devolucion = new Date(fechaDevolucion);

        if (actual < retiro) {
            return "Esperando a retirar";
        } else if (actual >= retiro && actual <= devolucion) {
            return "Retirado";
        } else {
            return "Devuelto";
        }
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Alquileres
            </Typography>

            <div>
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <Card
                            key={index}
                            sx={{
                                marginBottom: 2,
                                padding: 2,
                                backgroundColor: '#f5f5f5',
                                boxShadow: 1,
                            }}
                        >
                            <CardContent>
                                <Skeleton variant="text" width="40%" sx={{ marginBottom: 1 }} />
                                <Skeleton variant="text" width="70%" sx={{ marginBottom: 1 }} />
                                <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '8px' }} />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <AlquilerList alquileres={alquileresOrdenados} />
                )}
            </div>

            {showScrollButton && (
                <Tooltip 
                    title={<span style={{ fontSize: '1.2rem' }}>Volver arriba</span>}
                    placement="left" 
                    arrow
                >
                    <Fab
                        color="primary"
                        onClick={scrollToTop}
                        sx={{
                            width: 80,
                            height: 80,
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            zIndex: 1000,
                        }}
                    >
                        <KeyboardArrowUp sx={{ fontSize: '2rem' }} />
                    </Fab>
                </Tooltip>
            )}
            
        </>
    );
}

export default AlquileresPage;