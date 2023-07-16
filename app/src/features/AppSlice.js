import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: localStorage.getItem("userId") || null,
  name: "",
  genre:  localStorage.getItem('genre')||"" ,
  type: localStorage.getItem('type')||""
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setGenre: (state,action)=>{
      state.genre = action.payload;
    },
    setType: (state,action)=>{
      state.type = action.payload
    }
  },
});
export const { setId, setName, setGenre, setType } = appSlice.actions;
export default appSlice.reducer;
