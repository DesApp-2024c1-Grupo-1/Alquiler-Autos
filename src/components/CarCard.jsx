import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

function CarCard({ title, description, image }) {
    return (
        <Card 
            sx={{
                transition:"0.2",
                "&:hover":{
                    transform:"scale(1.05)"
                }
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={image}
                    height="100"
                    width="100"
                    alt='car'
                />
                <CardContent>
                    <Typography variant='h5'>{title}</Typography>
                    <Typography 
                        component="p" 
                        variant='="body2'
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            
        </Card>
    );
}

export default CarCard;