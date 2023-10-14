import {api} from './api'
import {GetRegionsResponse, GetRegionsSettings} from "./types/map";
export const mapApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRegions: builder.query<GetRegionsResponse,GetRegionsSettings>({
            query: (settings) => ({
                url:`/api/region/find/?name=${settings.name}&page=${settings.page}&size=${settings.size}`,
                method: 'GET',
            }),
        })
    }),
    overrideExisting:false
})

export const {
    useLazyGetRegionsQuery
} = mapApi