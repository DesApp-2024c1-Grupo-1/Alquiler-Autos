import { Box, Container, Grid, Pagination } from '@mui/material';
import React from 'react';
import CarCard from '../components/CarCard';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Filter from '../components/Filter';

const carsArrayList = [
    {
        title: "Card Title 1", description:"1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iusto quaerat, sapiente dolorem consequatur explicabo error in voluptatum! Aliquam, dolorem. Deleniti commodi voluptas error blanditiis illo incidunt. Iste, voluptatum placeat.", image:"https://via.placeholder.com/1000x200"
    },
    {
        title: "Card Title 2", description:"2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iusto quaerat, sapiente dolorem consequatur explicabo error in voluptatum! Aliquam, dolorem. Deleniti commodi voluptas error blanditiis illo incidunt. Iste, voluptatum placeat.", image:"https://via.placeholder.com/800x200"
    },
    {
        title: "Card Title 3", description:"3 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iusto quaerat, sapiente dolorem consequatur explicabo error in voluptatum! Aliquam, dolorem. Deleniti commodi voluptas error blanditiis illo incidunt. Iste, voluptatum placeat.", image:"https://via.placeholder.com/400x200"
    },
    {
        title: "Card Title 4", description:"4 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iusto quaerat, sapiente dolorem consequatur explicabo error in voluptatum! Aliquam, dolorem. Deleniti commodi voluptas error blanditiis illo incidunt. Iste, voluptatum placeat.", image:"https://via.placeholder.com/400x200"
    },
    {
        title: "Card Title 5", description:"1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iusto quaerat, sapiente dolorem consequatur explicabo error in voluptatum! Aliquam, dolorem. Deleniti commodi voluptas error blanditiis illo incidunt. Iste, voluptatum placeat.", image:"https://via.placeholder.com/1000x200"
    },
    {
        title: "Card Title 6", description:"2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iusto quaerat, sapiente dolorem consequatur explicabo error in voluptatum! Aliquam, dolorem. Deleniti commodi voluptas error blanditiis illo incidunt. Iste, voluptatum placeat.", image:"https://via.placeholder.com/800x200"
    },
    {
        title: "Card Title 7", description:"3 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iusto quaerat, sapiente dolorem consequatur explicabo error in voluptatum! Aliquam, dolorem. Deleniti commodi voluptas error blanditiis illo incidunt. Iste, voluptatum placeat.", image:"https://via.placeholder.com/400x200"
    },
    {
        title: "Card Title 8", description:"4 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro iusto quaerat, sapiente dolorem consequatur explicabo error in voluptatum! Aliquam, dolorem. Deleniti commodi voluptas error blanditiis illo incidunt. Iste, voluptatum placeat.", image:"https://via.placeholder.com/400x200"
    }
];

function Home() {
    return (
        <Grid
            container spacing={2}
        >
            <Grid
                sx={{
                    backgroundColor:"#B3D0FB", 
                    mt:4,
                    pr:2,
                    mb:2,
                    borderRadius:2
                    }}
                item
                    xs={5}
                    sm={5}
                    md={5}
                    lg={4}
            >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Filter />
                    </LocalizationProvider>
            </Grid>
            <Grid
                sx={{pr:1}}
                item
                xs={7}
                sm={7}
                md={7}
                lg={8}
            >
                <Grid 
                    container spacing={3}
                    justifyContent="center"
                    sx={{mt:9, ml:1}} 
                >
                    {carsArrayList.map((item) => (
                        <Grid
                            key={item.title}
                            item
                                xs={10}
                                sm={6}
                                md={4}
                                lg={3}
                        >
                            <CarCard 
                                title={item.title}
                                description={item.description}
                                image={item.image}
                            />
                        </Grid>
                    ))}
                    <Pagination 
                        sx={{mt:3, mb:2}}
                        count={10}
                        color="primary" />
                </Grid>
                
            </Grid>
            
        </Grid>
    );
}

export default Home;