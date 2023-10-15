import {OptionAnal} from "./AnalyticsPage";
import {Box, Paper, Stack, Typography} from "@mui/material";
import {theme} from "../Theme/customColors";
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: null,
    datasets: [
        {
            data: null,
            backgroundColor: [theme.palette.primary.main,theme.palette.primary.dark,theme.palette.primary.light,theme.palette.secondary.main],
        },
    ],
};

const ChartComponent:React.FC<{option:OptionAnal}> = ({option}) => {
    return (
        <Paper elevation={1} sx={{height:'100%'}}>
            <Stack direction={'column'}>
                <Box sx={{width:'100%',height:'5px',background:theme.palette.primary.light}}/>
                <Typography variant={'h5'} sx={{padding:'20px 25px 0 25px', display:'block'}}>{option.name}</Typography>
                <Stack direction={'row'} padding={"50px 70px 55px 40px"} >
                    <Box width={'50%'}>
                        <Doughnut
                            options={{
                                responsive:true,
                                maintainAspectRatio:false
                            }}
                            data={{
                                ...data,
                                labels:[],
                                datasets:[
                                    {
                                        ...data.datasets[0],
                                        data:option.data.map((dataItem) => dataItem.value)
                                    }
                                ]
                            }}
                        />
                    </Box>

                    <Stack>
                        <Typography variant={'subtitle2'} fontSize={'16px'}>{option.subtitle}</Typography>
                        {option.data.map((dataItem,index) => {
                            return (
                                <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
                                    <Box sx={{
                                        width:'10px',
                                        height:'10px',
                                        background:data.datasets[0].backgroundColor[index]
                                    }}/>
                                    <Typography variant={'subtitle1'}>{dataItem.label}</Typography>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}

export {ChartComponent}