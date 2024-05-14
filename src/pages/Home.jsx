import { Box, Container, Grid, Pagination } from '@mui/material';
import React from 'react';
import CarCard from '../components/CarCard';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

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
                    mt:2,
                    }}
                item
                    xs={3}
                    sm={3}
                    md={6}
                    lg={5}
            >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid
                            item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                        >
                            <DemoContainer
                                components={[
                                'DateTimePicker'
                                ]}
                            >
                                <DemoItem label="Responsive variant">
                                <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                </DemoItem>
                            </DemoContainer>
                        </Grid>
                    </LocalizationProvider>
            </Grid>
            <Grid
                item
                xs={9}
                sm={9}
                md={6}
                lg={7}
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