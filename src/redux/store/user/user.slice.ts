import {createSlice} from "@reduxjs/toolkit";
export interface UserState {
    is_auth:boolean,

}

const initialState:UserState = {
    is_auth:false,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setLogin: (state) => {
            state.is_auth = true
        }
    }
})

export const {actions,reducer} = userSlice