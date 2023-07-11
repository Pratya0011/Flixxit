import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:'',
    name:''
}

export const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        setId : (state,action)=>{
            state.id= action.payload;
        },
        setName : (state,action)=>{
            state.name = action.payload
        }
    }
})
export const {setId,setName}= appSlice.actions;
export default appSlice.reducer;