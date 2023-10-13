import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getTokens} from "../../components/functions/getAuthToken";

const disabledAuthTokenEndpoints = [
    ''
]
export const api = createApi({
    reducerPath:'api',
    tagTypes:['tag1','tag2'],
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_APP_API_HOST,
        prepareHeaders: (headers,api) => {
            if (!disabledAuthTokenEndpoints.includes(api.endpoint)) {
                headers.set('Authorization',`Bearer ${getTokens().accessToken}`)
            }
            return headers
        }
    }),
    endpoints: () => ({})
})
