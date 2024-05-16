import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DatePicker } from '@mui/x-date-pickers';


function Filter() {
    return (
        
        <div>
                    {/* <Grid direction="column" container spacing={2} my={2.5}>
                        <Grid
                            pr={1} 
                            item xs={12} sm={12} xl={12} lg={12}>
                            <DemoContainer
                                    
                                    components={[
                                    'DateTimePicker',
                                    'DesktopDateTimePicker',
                                    ]}
                                >
                                    <DemoItem label="Desktop variant">
                                        <DatePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                    </DemoItem> 
                                    <DemoItem label="Responsive variant">
                                        <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                    </DemoItem>
                                </DemoContainer> 
                        </Grid>
                    </Grid> */}
        </div>
    );
}

export default Filter;