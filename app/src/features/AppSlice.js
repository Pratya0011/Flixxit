import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  id: localStorage.getItem("userId") || null,
  name: "",
  watchlist:null,
  loading:true
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
  },
});
export const { setId, setName, setGenre, setType } = appSlice.actions;
export default appSlice.reducer;
