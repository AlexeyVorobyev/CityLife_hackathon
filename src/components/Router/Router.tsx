import {Navigate, Route, Routes} from "react-router-dom";
import {AuthPageLayout} from "../AuthPage/AuthPageLayout";
import React, {useEffect, useMemo, useState} from "react";
import {useLoginStatus} from "../functions/useLoginStatus";
import {SignIn} from "../AuthPage/SignIn";
import {SignUp} from "../AuthPage/SignUp";
import {LandingPage} from "../LandingPage/LandingPage";
import {HandleRedirectPage} from "../HandleRedirectPage/handleRedirectPage";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";
import {AwaitMail} from "../AuthPage/AwaitMail";

const Router:React.FC = () => {
    const user = useSelector((state:RootState) => state.user)
    const [isAuth,setAuth] = useState<boolean>(false)
    useLoginStatus()

    useEffect(() => {
        setAuth(user.is_auth)
    },[user.is_auth])

    return (
        <>
            <Routes>
                <Route path={'/handleRedirect'} element={<HandleRedirectPage/>}/>
            {isAuth ? (
                <>
                    <Route path={'/'} element={<Navigate to="/landing"/>} />
                    <Route path={'/landing'} element={<LandingPage/>}/>
                    <Route path='*' element={<Navigate to='/' />} />
                </>
            ) : (
                <>
                    <Route path={'/'} element={<Navigate to="/auth/sign-in"/>} />
                    <Route path={'/auth'} element={<AuthPageLayout/>}>
                        <Route path={'await-mail'} element={<AwaitMail/>}/>
                        <Route path={'sign-in'} element={<SignIn/>}/>
                        <Route path={'sign-up'} element={<SignUp/>}/>
                    </Route>
                    <Route path='*' element={<Navigate to='/' />} />
                </>
            )}
            </Routes>
        </>
    )
}

export {Router}