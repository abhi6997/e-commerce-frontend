import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducerTypes";
import { User } from "../../types/requestTypes"; 


const initialState : UserReducerInitialState = {
    loading : true,
    user:null
}
export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers:{
        userExist:(state,action:PayloadAction<User>)=>{
             state.loading = false,
             state.user = action.payload
        },
        userNotExist:(state)=>{
            state.loading = false,
            state.user = null

        }
    }



})

export const {userExist,userNotExist} = userReducer.actions;