import React, {useState} from "react";
import {Box, Button, Divider, Grid, IconButton, Paper, Popover, Stack, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useLoginStatus} from "../functions/useLoginStatus";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";
import markerSvg from '../../assets/marker.svg'
import {theme} from "../Theme/customColors";
import {useActions} from "../../redux/hooks/useActions";
import {ChartComponent, data} from "./ChartComponent";
import {Variant} from "@mui/material/styles/createTypography";
import {Doughnut} from "react-chartjs-2";

export interface OptionAnal {
    type:'chart'
    name:string,
    subtitle:string
    data:{
      label:string,
      value:number
    }[]
}

const options:OptionAnal[] = [
    {
        type:'chart',
        name:'Места размещения торговых точек',
        subtitle:'По суммарному объему покупок:',
        data:[
            {
                label:"В торговом центре",
                value:79.8
            },
            {
                label:"Рынок",
                value:19.8
            },
            {
                label:"Магазин при учреждении",
                value:3
            },
        ]
    },
    {
        type:'chart',
        name:'Распределение по ценовым нишам',
        subtitle:'По суммарному объему покупок:',
        data:[
            {
                label:"Премиум",
                value:3
            },
            {
                label:"Массовая",
                value:80
            },
            {
                label:"Эконом",
                value:17
            },
        ]
    },
    {
        type:'chart',
        name:'Размещение по отношению к потребителю',
        subtitle:'По суммарному объему покупок:',
        data:[
            {
                label:"Рядом с домом",
                value:95
            },
            {
                label:"Рядом с работой (учёбой)",
                value:5
            },
        ]
    },
    {
        type:'chart',
        name:'Сетевые и несетевые торговые точки',
        subtitle:'По суммарному объему покупок:',
        data:[
            {
                label:"Рядом с домом",
                value:83
            },
            {
                label:"Рядом с работой (учёбой)",
                value:17
            },
        ]
    }
]

const AnalyticsPage:React.FC = () => {

    const [openButtonPopover,setOpenButtonPopover] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenButtonPopover(!openButtonPopover)
    };

    const {setLogin} = useActions()
    const navigate = useNavigate()

    const stateRegionName = useSelector((state:RootState) => state.user.currentRegion)

    return (
        <Box sx={{
            overflow:'hidden',
        }}>
            <Box sx={{
                background: '#FFF',
                boxShadow: '0px 0px 7px 3px rgba(0, 0, 0, 0.25)',
                display:'flex',
                padding:'20px 80px 20px 120px',
                width:'100%',
                justifyContent:'space-between',
                boxSizing:'border-box',
                height:'80px',
                position:'relative',
                zIndex:10000
            }}>
                <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
                    <img src={markerSvg}/>
                    <Typography variant={'subtitle2'} color={'#545454'}>{stateRegionName || ""}</Typography>
                </Stack>
                <Stack direction={'row'} spacing={'120px'}>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        sx={{width:'200px'}}
                    >Информация</Button>
                    <Button
                        variant={'outlined'}
                        size={'large'}
                        color={"primary"}
                        sx={{width:'200px'}}
                        onClick={() => navigate('/app/landing')}
                    >Карта</Button>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <IconButton>
                        <AccountCircleIcon/>
                    </IconButton>
                    <Typography variant={'subtitle1'} sx={{cursor:'pointer'}}>Личный кабинет</Typography>
                    <IconButton onClick={handleClick}>
                        <CloseIcon/>
                    </IconButton>
                    <Popover
                        open={openButtonPopover}
                        anchorEl={anchorEl}
                        sx={{
                            zIndex:100000
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Paper elevation={3} sx={{padding:'10px'}}>
                            <Stack direction={'column'} spacing={1}>
                                <Typography>Выйти из аккаунта?</Typography>
                                <Stack direction={'row'} spacing={'10px'}>
                                    <Button size={'large'}
                                            onClick={() => {
                                                localStorage.clear()
                                                setLogin(false)
                                            }
                                            }
                                            variant="contained">
                                        Да
                                    </Button>
                                    <Button size={'large'}
                                            onClick={() => setOpenButtonPopover(false)}
                                            variant="contained">
                                        Нет
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Popover>
                </Stack>
            </Box>

            <Box sx={{
                width:'100%',
                padding:'30px 150px 30px 150px',
                background:'#F1F1F1',
                boxSizing:'border-box'
            }}>
                <Typography variant={'h4'} margin={'25px 0 22px 0'}>Общие характеристики</Typography>
                <Grid container spacing={'40px'}>
                    {options.map((option) => {
                        if (option.type === 'chart') {

                            return (
                                <Grid item xs={6}>
                                    <ChartComponent option={option}/>
                                </Grid>
                            )
                        }
                    })}
                </Grid>

                <Typography variant={'h4'} margin={'55px 0 22px 0'}>Характеристика потребления в разрезе доходных групп</Typography>
                <Paper elevation={1} sx={{height:'100%'}}>
                    <Stack direction={'column'} spacing={'40px'}>
                        <Box sx={{width:'100%',height:'5px',background:theme.palette.primary.light}}/>
                        <Stack direction={'column'} padding={"0 75px 100px 30px"} spacing={'40px'}>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <Typography variant={'h6'}>Доходные группы:</Typography>
                                {incomeGroups.map((item,index) => {
                                    return (
                                        <TypographyPointed colorDot={colorPalette[index]} colorTypography={colorPalette[index]} variant={'h6'} text={item}/>
                                    )
                                })}
                            </Stack>

                            <Stack direction={'column'} spacing={'20px'}>
                                <Typography variant={'h6'}>Соотношение групп</Typography>
                                <Stack direction={'column'} justifyContent={'space-between'}>
                                    {rationGroups.map((item) => {
                                        return (
                                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                                <Typography color={'#7A7A7A'} variant={'subtitle1'}>{item.label}</Typography>
                                                <Stack direction={'row'} alignItems={'center'} justifyContent={'stretch'} width={'65%'}>
                                                    {item.data.map((itemData,index) => {

                                                        const sum = item.data.reduce((partialSum, a) => partialSum + a, 0)

                                                        return <Box sx={{
                                                            height:'15px',
                                                            display:'flex',
                                                            justifyContent:'center',
                                                            alignItems:'center',
                                                            width: `${100/sum * itemData}%`,
                                                            backgroundColor:colorPalette[index]
                                                        }}><Typography color={'white'} fontSize={'15px'}>{itemData}</Typography></Box>
                                                    })}
                                                </Stack>
                                            </Stack>
                                        )
                                    })}
                                </Stack>
                            </Stack>

                            <Stack direction={'column'} spacing={'20px'}>
                                <Typography variant={'h6'}>Характеристики группы</Typography>
                                <Stack direction={'column'}>
                                    {charactersGroups.map((characterGroups,index) => {
                                        console.log(characterGroups.typeColor !== 'local' && characterGroups.typeSize !== 'large')
                                        return (
                                            <>
                                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'30px 0 30px 0'}>
                                                    {characterGroups.label.legend ? (<Stack direction={'column'} spacing={'15px'}>
                                                        <Typography color={'#7A7A7A'} variant={'subtitle1'}>{characterGroups.label.text}</Typography>
                                                        {characterGroups.label.legend.map((legendItem,index) => {
                                                            return (
                                                                <TypographyPointed text={legendItem} colorDot={colorPalette[index]}/>
                                                            )
                                                        })}
                                                    </Stack>) : <Typography color={'#7A7A7A'} variant={'subtitle1'} maxWidth={'160px'}>{characterGroups.label.text}</Typography>}


                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={'space-between'}
                                                        alignItems={'center'}
                                                        width={'70%'}
                                                        boxSizing={'border-box'}
                                                        paddingLeft={characterGroups.typeSize !== 'large' ? '26px' : '0px'}
                                                        paddingRight={characterGroups.typeSize !== 'large' ? '26px' : '0px'}
                                                    >
                                                        {characterGroups.typeColor === 'general'
                                                            && characterGroups.typeSize === 'small'
                                                            && characterGroups.data.map((dataItem, index) => {
                                                                return <ChartEzEz option={dataItem as number} index={index}/>
                                                            })}
                                                        {characterGroups.typeColor === 'local'
                                                            && characterGroups.typeSize === 'large'
                                                            && characterGroups.data.map((dataItem) => {
                                                                return <ChartHardHard options={dataItem as number[]}/>
                                                            })}
                                                        {characterGroups.typeColor === 'local'
                                                            && characterGroups.typeSize === 'small'
                                                            && characterGroups.data.map((dataItem) => {
                                                                return <ChartEzHard option={dataItem as number}/>
                                                            })}
                                                    </Stack>

                                                </Stack>
                                                {index !== charactersGroups.length - 1 && <Divider/>}
                                            </>
                                        )
                                    })}
                                </Stack>
                            </Stack>

                        </Stack>
                    </Stack>
                </Paper>
            </Box>

        </Box>
    )
}

const ChartEzEz = ({option,index}:{option:number,index:number}) => {
    return (
        <Box width={'75px'} height={'75px'}>
            <Doughnut
                options={{
                    responsive:true,
                    maintainAspectRatio:false
                }}
                data={{
                    labels:[],
                    datasets:[
                        {
                            data:[option,100 - option],
                            backgroundColor:[colorPalette[index],'#A1A1A1']
                        }
                    ]
                }}
            />
        </Box>
    )
}

const ChartEzHard = ({option}:{option:number}) => {
    return (
        <Box width={'75px'} height={'75px'}>
            <Doughnut
                options={{
                    responsive:true,
                    maintainAspectRatio:false
                }}
                data={{
                    labels:[],
                    datasets:[
                        {
                            data:[option,100 - option],
                            backgroundColor:[colorPalette[0],colorPalette[1]]
                        }
                    ]
                }}
            />
        </Box>
    )
}

const ChartHardHard = ({options}:{options:number[]}) => {
    return (
        <Box width={'130px'} height={'130px'}>
            <Doughnut
                options={{
                    responsive:true,
                    maintainAspectRatio:false
                }}
                data={{
                    labels:[],
                    datasets:[
                        {
                            data:options,
                            // @ts-ignore
                            backgroundColor:options.map((value, index) => colorPalette[index])
                        }
                    ]
                }}
            />
        </Box>
    )
}

interface TypographyPointedProps {
    colorTypography?:string
    colorDot?:string
    variant?:Variant
    text?:string

}
const TypographyPointed:React.FC<TypographyPointedProps> = ({
                                                            colorTypography,
                                                            colorDot,
                                                            variant,
                                                            text
                                                            }) => {
    return (
        <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
            <Box sx={{
                width:'10px',
                height:'10px',
                background:colorDot
            }}/>
            <Typography variant={variant} color={colorTypography}>{text}</Typography>
        </Stack>
    )
}

const incomeGroups:string[] = ['Высокодоходные','Среднеобеспеченные','Малообеспеченные','Низкодоходные']
const rationGroups = [
    {
        label:'Численность группы, % от общей численности',
        data:[6,54,30,10]
    },
    {
        label:'Оборот группы, % от общей суммы',
        data:[6,57,28,9]
    }
]

interface ICharactersGroup {
    label: {
        text:string,
        legend?:string[]
    },
    data: number[] | number[][]
    typeSize: 'small' | 'large'
    typeColor: 'local' | 'general'
}

const charactersGroups:ICharactersGroup[] = [
    {
        label: {
            text:'Доля покупателей, %',
        },
        data:[78,63,78,78],
        typeSize:'small',
        typeColor:'general'
    },
    {
        label: {
            text:'Доля людей с высшим образованием, %',
        },
        data:[70,64,58,48],
        typeSize:'small',
        typeColor:'general'
    },
    {
        label: {
            text:'Доля состоящих в браке, %',
        },
        data:[58,57,62,61],
        typeSize:'small',
        typeColor:'general'
    },
    {
        label: {
            text:'Соотношение мужчин и женщин, %',
            legend:['Мужчины','Женщины']
        },
        data:[40,38,35,37],
        typeSize:'small',
        typeColor:'local'
    },
    {
        label: {
            text:'Распределение по должностям, %',
            legend:['Руководитель','Специалист','Рабочий']
        },
        data:[[33,37,30],[19,40,41],[30,25,15],[15,33,52]],
        typeSize:'large',
        typeColor:'local'
    },
    {
        label: {
            text:'Распределение по возрастным группам, %',
            legend:['до 29 лет','30-39 лет','40-49 лет','50 лет и старше']
        },
        data:[[13,41,23,23],[15,37,27,79],[14,40,26,20],[17,34,24,25]],
        typeSize:'large',
        typeColor:'local'
    },
]

const colorPalette = [theme.palette.primary.dark,theme.palette.primary.light,theme.palette.secondary.dark,theme.palette.secondary.light]


export {AnalyticsPage}