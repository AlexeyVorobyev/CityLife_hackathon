import React, {useEffect, useState} from "react";
import {MapRender} from "../MainMap/MapRender";
import {Box, Button, IconButton, Paper, Popover, Stack, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useLoginStatus} from "../functions/useLoginStatus";
import {useNavigate} from "react-router-dom";
import {useActions} from "../../redux/hooks/useActions";

const LandingPage:React.FC = () => {

    const [openButtonPopover,setOpenButtonPopover] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenButtonPopover(!openButtonPopover)
    };

    const {setLogin} = useActions()
    const navigate = useNavigate()

    return (
        <Box sx={{
            height:'100vh',
            width:'100vw',
            overflow:'hidden'
        }}>
            <Box sx={{
                background: '#FFF',
                boxShadow: '0px 0px 7px 3px rgba(0, 0, 0, 0.25)',
                display:'flex',
                padding:'20px 80px 20px 120px',
                width:'100%',
                justifyContent:'end',
                boxSizing:'border-box',
                height:'80px',
                position:'relative',
                zIndex:10000
            }}>
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
            <MapRender/>
        </Box>
    )
}

export {LandingPage}