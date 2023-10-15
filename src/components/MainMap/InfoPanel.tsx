import {Button, Divider, Paper, Stack, Typography} from "@mui/material";
import React from "react";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {faker} from "@faker-js/faker";
import {theme} from "../Theme/customColors";
import {useNavigate} from "react-router-dom";


const InfoPanel:React.FC<any> = ({baseDigit,algorythm,currentMenuItem}) => {

    const navigate = useNavigate()

    function* generateLabels() {
        const date = new Date()
        for (let i = 1; i <= date.getDate(); i++) {
            yield `${i < 10 ? '0' + i.toString() : i }.${date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth()}`
        }
    }

    function* generateFakeData(baseDigit:number) {
        let last = baseDigit
        const date = new Date()
        for (let i = 1; i <= date.getDate(); i++) {
            yield last * faker.number.float({min:0.9, max:1.1})
        }
    }

    const labels = [...generateLabels()]

    const data = {
        labels,
        datasets: [
            {
                label: 'Параметр',
                data: [...generateFakeData(baseDigit)],
                backgroundColor: theme.palette.primary.main,
            },
        ],
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Месячные показатели',
            },
        },
    };

    const mapParams = [
        {
            title: 'Колебания',
            res: ((data:number[]) => {
                return Math.max(...data) - Math.min(...data)
            })(data.datasets[0].data)
        },
        {
            title:'Прогноз потребления',
            res: ((data:number[]) => {
                return data.reduce((partialSum, a) => partialSum + a, 0) / data.length
            })(data.datasets[0].data)
        },
        {
            title:'Нагрузка сети',
            res: ((data:number[]) => {
                const squareCity = 340 // в км
                const mvt = 4305
                const sqarePoly = 80 // niki
                const consumption = data[data.length-1] //niki
                return (consumption/(mvt/squareCity * sqarePoly))*100
            })(data.datasets[0].data)
        },
    ]

    const history = {
        title:'История',
        res:[
            {
                title:'Перегрузка сети:',
                subtitle:'12.10.2023-13.10.2023',
            },
            {
                title:'Перекос нагрузки:',
                subtitle:'10%',
            }
        ]
    }

    if (['Рекомендации'].includes(currentMenuItem)) {
        console.log(algorythm)
        return (
            <Stack direction={'column'} alignItems={'stretch'} spacing={'20px'}>
                <Typography variant={'h5'}>Некорректные места:</Typography>
                <Stack direction={'column'} sx={{maxHeight:'200px', overflowY:'scroll'}}>
                    {algorythm && algorythm.invalidPoints.map((point:any,index:number) => {
                        return (
                            <>
                                <Typography variant={'subtitle1'}>{(index + 1) + '. ' + point.properties.name}</Typography>
                                <Typography variant={'subtitle1'}>{'Адрес: ' + index + '. '+point.properties.formatted}</Typography>
                                <Divider/>
                            </>
                            )
                    })}
                </Stack>
                {algorythm.prohibitedPoints?.length ? (<Typography variant={'h5'}>Нелегальные места:</Typography>) : null}
                <Stack direction={'column'} sx={{maxHeight:'200px', overflowY:'scroll'}}>
                    {algorythm && algorythm.prohibitedPoints.map((point:any,index:number) => {
                        return (
                            <>
                                <Typography variant={'subtitle1'}>{(index + 1) + '. ' + point.properties.name}</Typography>
                                <Typography variant={'subtitle1'}>{'Адрес: ' + index + '. '+point.properties.formatted}</Typography>
                                <Divider/>
                            </>
                        )
                    })}
                </Stack>
                {algorythm && <Typography variant={'h5'}>Балл: {algorythm.scope}</Typography>}
            </Stack>)
    }
    else {
        return (
            <Stack direction={'column'} alignItems={'stretch'} spacing={'20px'}>
                <Paper elevation={3} sx={{
                    padding:'25px',
                }}>
                    <Bar
                        style={{
                            width:'100%',
                        }}
                        options={options}
                        data={data}/>
                </Paper>
                {mapParams.map((param) => (
                    <Paper elevation={2} sx={{padding:'10px 0px 10px 20px'}}>
                        <Stack direction={'row'} spacing={'20px'} alignItems={'center'}>
                            <Typography variant={'subtitle1'}>{param.title}</Typography>
                            <Typography variant={'subtitle2'}>{param.res}</Typography>
                        </Stack>
                    </Paper>
                ))}
                <Button
                    variant={'outlined'}
                    onClick={() => {
                        navigate('../analytics')
                    }}
                >Подробнее</Button>
            </Stack>
        )
    }

}

export {InfoPanel}