import {createSlice} from "@reduxjs/toolkit";
export interface UserState {
    is_auth:boolean,
    currentRegion:string | null

}

const initialState:UserState = {
    is_auth:false,
    currentRegion:null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setLogin: (state,{payload}) => {
            state.is_auth = payload
        },
        setCurrentRegion: (state,{payload}) => {
            state.currentRegion = payload.currentRegion
        }
    }
})

export const {actions,reducer} = userSlice