import {useActions} from "../../redux/hooks/useActions";

export const useLoginStatus = () => {

    const {setLogin} = useActions()

    if (
        Boolean(localStorage.getItem('accessToken')) &&
        Boolean(localStorage.getItem('refreshToken')) &&
        Boolean(localStorage.getItem('expiry'))
    ) setLogin()

}

