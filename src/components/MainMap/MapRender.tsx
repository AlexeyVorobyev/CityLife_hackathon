import {MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl} from 'react-leaflet'
import {FormProvider, useForm} from "react-hook-form";
import {Box, CircularProgress, Grid, IconButton, Paper, Stack, Typography} from "@mui/material";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {DistrictPolygon} from "./DistrictPolygon";
import {CustomServerAutoComplete} from "../formUtils/CustomServerAutocomplete/CustomServerAutoComplete";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import 'leaflet/dist/leaflet.css';
import {MapDrawPolygon} from "./MapDrawPolygon";
import {theme} from "../Theme/customColors";
import {Menu} from "./SideBar";
import {sideBarConfig} from "./SideBarConfig";
import {
    useGetAlgorithmMutation,
    useGetPointsMutation,
    useLazyGetPointsQuery,
    useLazyGetRegionsQuery
} from "../../redux/api/map.api";
import {useNavigate} from "react-router-dom";
import {InfoPanel} from "./InfoPanel";
import {useActions} from "../../redux/hooks/useActions";
import {CustomSelect} from "../formUtils/CustomSelect/CustomSelect";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import '@changey/react-leaflet-markercluster/dist/styles.min.css';

const selectFilterOptions = [
    {
        id:"commercial.health_and_beauty",
        name:"Красота и здоровье",
    },
    {
        id:"commercial.food_and_drink",
        name:"Еда и напитки",
    },
    {
        id:"commercial.outdoor_and_sport",
        name:"Активный отдых и спорт",
    },
    {
        id:"education",
        name:"Образование",
    },
    {
        id:"childcare.kindergarten",
        name:"Детские сады",
    },
    {
        id:"natural",
        name:"Природа",
    },
    {
        id:"entertainment.culture",
        name:"Культура",
    },
    {
        id:"healthcare",
        name:"Здравоохранение",
    },
    {
        id:"leisure",
        name:"Досуг",
    },
    {
        id:"national_park",
        name:"Парки",
    },
    {
        id:"building.university",
        name:"Университеты",
    },
    {
        id:"building.college",
        name:"Колледжи",
    },
    {
        id:"building.school",
        name:"Школа",
    },
    {
        id:"building.sport",
        name:"Спорт",
    },
    {
        id:"building.spa",
        name:"Спа-центры",
    },
    {
        id:"heritage",
        name:"Общественное достояние",
    },
    {
        id:"activity.sport_club",
        name:"Спортивные клубы",
    },
    {
        id:"sport",
        name:"Спорт",
    },
    {
        id:"commercial.smoking",
        name:"Табачные магазины",
    },
    {
        id:"commercial.weapons",
        name:"Охотничьи магазины",
    },
    {
        id:"catering.fast_food",
        name:"Фаст-фуд",
    },
    {
        id:"catering.bar",
        name:"Бары",
    },
    {
        id:"catering.pub",
        name:"Пабы",
    },
    {
        id:"catering.taproom",
        name:"Пивная",
    },
    {
        id:"adult",
        name:"Для взрослых",
    },
    {
        id:"building.prison",
        name:"Тюрьмы",
    },
    {
        id:"production.brewery",
        name:"Пивоварни",
    },
    {
        id:"production.winery",
        name:"Винодельни",
    },
]


interface Props {

}

const MapRender:React.FC<Props> = () => {
    const methods = useForm()
    const {watch, setValue} = methods
    const watchPolygonAutocomplete = watch('polygon')
    const watchPolygonDraw = watch('drawPolygon')
    const watchFilter = watch('filter')
    const [isPolygonChosen,setIsPolygonChosen] = useState<boolean>(false)
    const [openNav,setOpenNav] = useState<boolean>(false)
    const [rearInfoPanel, setRearInfoPanel] = useState<boolean>(false)
    const [currentMenuItem,setCurrentMenuItem] = useState<string | null>(null)
    const [kostyl,setKostyl] = useState<boolean>(true)
    const navigate = useNavigate()
    const [setPolygon,setSetPolygon] = useState<any>(null)
    const {setCurrentRegion} = useActions()
    const [getPoints] = useGetPointsMutation()
    const [getAlgorythm] = useGetAlgorithmMutation()
    const [getTypes] = useGetAlgorithmMutation()

    const [points,setPoints] = useState<any>(null)
    const [algorythm,setAlgorythm] = useState<any>(null)
    const [types,setTypes] = useState<any>(null)
    const [goCircle,setGoCircle] = useState<boolean>(false)

    useEffect(() => {
        if (watchFilter) {
            console.log(watchFilter)
            console.log(watchPolygonAutocomplete)
            if (watchPolygonAutocomplete) {
                setGoCircle(true)
                getPoints({json:JSON.stringify(watchPolygonAutocomplete.points),category:watchFilter.id})
                    .then((response:any) => {
                        console.log(response,'filters_res')
                        setPoints(response.data.response.points)
                        setGoCircle(false)
                    })
            }
        }
    },[watchFilter,watchPolygonAutocomplete])

    useEffect(() => {
        if (watchPolygonAutocomplete) {
            getAlgorythm({json:JSON.stringify(watchPolygonAutocomplete.points)})
                .then((response:any) => {
                    console.log(response,'algo_rec')
                    setAlgorythm(response.data.response)
                })
        }
    },[watchPolygonAutocomplete])

    useEffect(() => {
        if (currentMenuItem) {
            setRearInfoPanel(true)
        }
        else {
            setRearInfoPanel(false)
        }
    },[currentMenuItem])

    useLayoutEffect(() => {
        console.log(kostyl)
        if (watchPolygonDraw && kostyl) {
            console.log(watchPolygonDraw,'adadadad')
            console.log(watchPolygonDraw.geoData?.geometry?.coordinates,'adadadad')
            setValue('polygon',{id:watchPolygonDraw.id,name:'Произвольная область',points:watchPolygonDraw.geoData?.geometry?.coordinates.map((pair:[number,number]) => {return {lat:pair[0],lon:pair[1]}})})
            setKostyl(!kostyl)
        }
        else if (!watchPolygonAutocomplete && watchPolygonDraw) {
            setValue('polygon',undefined)
            navigate('/')
        }
    },[watchPolygonDraw,watchPolygonAutocomplete])

    useLayoutEffect(() => {
        if (watchPolygonDraw || watchPolygonAutocomplete) {
            setIsPolygonChosen(true)
            setOpenNav(true)
            if (watchPolygonAutocomplete) setCurrentRegion({currentRegion:watchPolygonAutocomplete?.name})
        }
        if (watchPolygonAutocomplete) {
            setSetPolygon(watchPolygonAutocomplete.points)
        }
        else {
            setIsPolygonChosen(false)
            setOpenNav(false)
            setRearInfoPanel(false)
        }
    },[watchPolygonAutocomplete,watchPolygonDraw])

    const SetZoom = ({coords}:{coords:any}) => {
        const map = useMap()
        if (coords) map.fitBounds(coords)
        return null
    }

    return (
        <FormProvider {...methods}>
            <Box
                sx={{
                    width:'100%',
                    height:'calc(100% - 80px)',
                    position:'relative'
                }}
            >
                <Stack flexDirection={'row'} sx={{
                    width:'20%',
                    position:'absolute',
                    zIndex:1000,
                    gap:'20px',
                    marginTop:'20px',
                    marginLeft:'20px',
                    alignItems:'center'
                }}>
                    <Stack direction={'column'} spacing={2} sx={{width:'100%'}}>
                        <Paper elevation={3} sx={{width:'100%'}}>
                            <CustomServerAutoComplete
                                label={'Район'} perPage={5} useLazyGetQuery={useLazyGetRegionsQuery} name={'polygon'}
                                optionsConfig={{optionsPath:['response','list'],optionsReadFunction:(value) => value}} />
                        </Paper>
                        {openNav && <Paper elevation={3} sx={{width:'100%',top:'100px'}}>
                            <CustomSelect name={'filter'} options={selectFilterOptions} label={'Фильтр'}/>
                        </Paper>}
                    </Stack>
                    {isPolygonChosen && openNav && <IconButton
                        size="small"
                        style={{marginTop:'0px', background:theme.palette.primary.main}}
                        aria-label="Открыть навигационную панель"
                        onClick={() => setOpenNav(false)}
                    >
                        <KeyboardArrowRightIcon sx={{color:theme.palette.primary.contrastText}}/>
                    </IconButton>}
                    {isPolygonChosen && !openNav && <IconButton
                        size="small"
                        style={{marginTop:'0px', background:theme.palette.primary.main}}
                        aria-label="Открыть навигационную панель"
                        onClick={() => setOpenNav(true)}
                    >
                        <KeyboardArrowLeftIcon sx={{color:theme.palette.primary.contrastText}}/>
                    </IconButton>}
                </Stack>


                <Grid container
                    sx={{
                        height:'100%',
                    }}
                >
                    {isPolygonChosen && openNav && <Grid item xs={3}>
                        <Box
                            sx={{
                                background:'white',
                                width:'100%',
                                padding:'180px 0 0 0',
                                boxSizing:'border-box',
                                height:'calc(100vh - 80px)',

                                overflowY:'scroll',
                                '&::-webkit-scrollbar': {
                                    width: '0.4em'
                                },
                                '&::-webkit-scrollbar-track': {
                                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0,0,0,.1)',
                                }
                            }}>
                            <Menu items={sideBarConfig} level={1} callback={setCurrentMenuItem}/>
                        </Box>
                    </Grid>}
                    <Grid item xs={12 - 4*Number(rearInfoPanel) - 3*Number(openNav)}sx={{
                        height:'100%',
                        width:'100%',
                        position:'relative'
                    }}>
                        {goCircle && <CircularProgress sx={{position:'absolute',top:'10px',left:'10px',zIndex:1000000}}/>}
                        <MapContainer center={[45.0360, 38.9746]} zoom={12} zoomControl={false} style={{
                            height:'100%',
                            width:'inherit'
                        }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <MarkerClusterGroup>
                                {points && points.map((point:any) => {
                                    return (
                                        <Marker position={[point.properties.lat,point.properties.lon]}>
                                            <Popup>
                                                <Paper sx={{padding:'20px'}}>
                                                    <Typography>{point.properties.name}</Typography>
                                                </Paper>
                                            </Popup>
                                        </Marker>
                                    )
                                })}
                            </MarkerClusterGroup>


                            {setPolygon && <SetZoom coords={setPolygon}/>}

                            <ZoomControl position={"bottomright"}/>

                            {(!watchPolygonAutocomplete || watchPolygonDraw) && <MapDrawPolygon name={'drawPolygon'}
                                            defaultValue={null}/>}

                            {watchPolygonAutocomplete && !watchPolygonDraw && <DistrictPolygon
                                coordinates={watchPolygonAutocomplete.points.map((point:any) => [point.lat,point.lon])}
                                properties={{title:'some polygon'}}/>}
                        </MapContainer>
                    </Grid>
                    {rearInfoPanel && <Grid item xs={4}>
                        <Box
                            sx={{
                                position:'relative',
                                background:'white',
                                width:'100%',
                                padding:'80px 30px 0 30px',
                                boxSizing:'border-box',
                                height:'calc(100vh - 80px)',
                                overflowY:'scroll',
                                zIndex:1000,
                                '&::-webkit-scrollbar': {
                                    width: '0.4em'
                                },
                                '&::-webkit-scrollbar-track': {
                                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0,0,0,.1)',
                                }
                            }}>
                            <IconButton size={'small'} onClick={() => setRearInfoPanel(false)}
                                        sx={{
                                            position:'absolute',
                                            top:'10px',
                                            right:'10px'
                                        }}>
                                <CloseIcon />
                            </IconButton>
                            <InfoPanel baseDigit={100} currentMenuItem={currentMenuItem} algorythm={algorythm}/>
                        </Box>
                    </Grid>}
                </Grid>

            </Box>
        </FormProvider>
    )
}


export {MapRender}