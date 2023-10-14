import {MapContainer, TileLayer, ZoomControl} from 'react-leaflet'
import {FormProvider, useForm} from "react-hook-form";
import {Box, Grid, IconButton, Stack, Typography} from "@mui/material";
import React, {useEffect, useLayoutEffect, useReducer, useState} from "react";
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
interface Props {

}

const MapRender:React.FC<Props> = () => {
    const methods = useForm()
    const {watch} = methods
    const watchPolygonAutocomplete = watch('polygon')
    const watchPolygonDraw = watch('drawPolygon')
    const [loadedPolygon, setLoadedPolygon] = useState<boolean>(false)
    const [isPolygonChosen,setIsPolygonChosen] = useState<boolean>(true)
    const [openNav,setOpenNav] = useState<boolean>(false)
    const [rearInfoPanel, setRearInfoPanel] = useState<boolean>(true)
    const [currentMenuItem,setCurrentMenuItem] = useState<string>('')


    useEffect(() => {
        setLoadedPolygon(watchPolygonAutocomplete)
        setIsPolygonChosen(isPolygonChosen)
    },[watchPolygonAutocomplete])


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
                    {/*<Typography >"SUCK MY DICK"</Typography>*/}
                    {/*<CustomServerAutoComplete label={'Район'} perPage={5} useLazyGetQuery={'ss'} name={'polygon'}/>*/}
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
                                padding:'60px 0 0 0',
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
                    <Grid item xs={12 - 3*Number(rearInfoPanel) - 3*Number(openNav)}sx={{
                        height:'inherit',
                    }}>
                        <MapContainer center={[51.505, -0.09]} zoom={13} zoomControl={false} style={{
                            height:"inherit"
                        }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <ZoomControl position={"bottomright"}/>

                            <MapDrawPolygon name={'drawPolygon'}
                                            defaultValue={null}/>

                            {loadedPolygon && <DistrictPolygon coordinates={[[-10,10],[10,10],[-10,-10]]} properties={{title:'some polygon'}}/>}
                        </MapContainer>
                    </Grid>
                    {rearInfoPanel && <Grid item xs={3}>
                        <Box
                            sx={{
                                position:'relative',
                                background:'white',
                                width:'100%',
                                padding:'60px 0 0 0',
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
                            <IconButton size={'small'} onClick={() => setRearInfoPanel(false)}
                                        sx={{
                                            position:'absolute',
                                            top:'10px',
                                            left:'10px'
                                        }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Grid>}
                </Grid>

            </Box>
        </FormProvider>
    )
}

export {MapRender}