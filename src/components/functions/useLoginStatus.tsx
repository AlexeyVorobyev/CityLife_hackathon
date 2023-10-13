
export const useLoginStatus = (): boolean => {
    return (
        Boolean(localStorage.getItem('accessToken')) &&
        Boolean(localStorage.getItem('refreshToken')) &&
        Boolean(localStorage.getItem('expiry'))
    )
}

