import {api} from './api'
import {GetRegionsResponse, GetRegionsSettings} from "./types/map";
export const mapApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRegions: builder.query<GetRegionsResponse,GetRegionsSettings>({
            query: (settings) => ({
                url:`/api/region/find/?name=${settings.name}&page=${settings.page}&size=${settings.size}`,
                method: 'GET',
            }),
        }),
        getPoints: builder.mutation<any,{json:string,category:string}>({
            query: (body) => ({
                url:`/api/point/search_points`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
        }),
        getAlgorithm: builder.mutation<any,{json:string}>({
            query: (body) => ({
                url:`/api/point/algorithm`,
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body
            }),
        }),
        getTypes: builder.mutation<any,{json:string}>({
            query: (body) => ({
                url:`/api/point/type`,
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
    useLazyGetRegionsQuery,
    useGetPointsMutation,
    useGetAlgorithmMutation,
    useGetTypesMutation
} = mapApi