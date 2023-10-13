import React from "react";
import {useForm} from "react-hook-form";
import {FormProvider} from "react-hook-form";
import {Button, Divider, Grid, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {CustomInput} from "../formUtils/CustomInput/CustomInput";
import {theme} from "../Theme/customColors";
import {useAuthLoginMutation} from "../../redux/api/auth.api";
import {getTokens} from "../functions/getAuthToken";


const SignIn:React.FC<any> = () => {

    const methods = useForm()
    const {handleSubmit, formState: {errors}} = methods
    const [authLogin] = useAuthLoginMutation()
    const navigate = useNavigate()

    const onSubmit = (data:any) => {
        console.log(data)
        const promise = authLogin(data)
        promise
            .then((response) => {
                if (response.hasOwnProperty('data')) {
                    // @ts-ignore
                    localStorage.setItem('accessToken',response.data.response.accessToken)
                    // @ts-ignore
                    localStorage.setItem('refreshToken',response.data.response.refreshToken)
                    // @ts-ignore
                    localStorage.setItem('expiry',response.data.response.expiry)
                    navigate('/')
                }
            })
    }

    return (
        <FormProvider {...methods} >
            <Grid container direction={"column"} rowGap={2} justifyContent={'center'}>
                <Grid item>
                    <CustomInput name={'email'} required label={'Почта'}
                                 error={Boolean(errors.login)} errorText={errors.login?.message as string | undefined}/>
                </Grid>
                <Grid item>
                    <CustomInput name={'password'} required label={'Пароль'} hidden
                                 error={Boolean(errors.password)} errorText={errors.password?.message as string | undefined}/>
                </Grid>
                <Grid item alignSelf={'center'}>
                    <Button
                        size={'large'}
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}>ВОЙТИ</Button>
                </Grid>
                <Divider orientation={"horizontal"} variant={'middle'}>
                    <Typography variant={'subtitle1'} textAlign={'center'}>ИЛИ</Typography>
                </Divider>
                <Grid container columnSpacing={2} justifyContent={"center"}>
                    <Grid xs={8} item>
                        <Typography variant={'subtitle1'} textAlign={'center'}>
                            <NavLink to={'../sign-up'} style={{textDecoration:'none',color:theme.palette.primary.main}}>Зарегестрируйтесь</NavLink>,<br/> если у вас нет аккаунта</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export {SignIn}
