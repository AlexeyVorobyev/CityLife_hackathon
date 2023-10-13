import {api} from './api'
import {
    LoginPayload,
    LoginResponse,
    RefreshPayload,
    RefreshResponse,
    SignUpPayload,
    SignUpResponse
} from "./types/auth";
export const templateApi = api.injectEndpoints({
    endpoints: (builder) => ({
        authSignUp: builder.mutation<SignUpResponse,SignUpPayload>({
            query: (body) => ({
                url:`/auth/signup`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
        }),
        authRefresh: builder.mutation<RefreshResponse,RefreshPayload>({
            query: (body) => ({
                url:`/auth/refresh`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
        }),
        authLogin: builder.mutation<LoginResponse,LoginPayload>({
            query: (body) => ({
                url:`/auth/login`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
        })
    }),
    overrideExisting:false
})

export const {
    useAuthLoginMutation,
    useAuthRefreshMutation,
    useAuthSignUpMutation
} = templateApi