import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchBar, getuser } from "../Components/request";
import {get} from '../Custom/useApi'

export const fetchSearch = createAsyncThunk("search", async (value) => {
  const res = await get(`${searchBar.getSearch}?name=${value}`);
  return res.data.result;
});

export const fetchUser = createAsyncThunk("user", async(id)=>{
  const res = await get(`${getuser.getUserById}/${id}`);
  return res.data.user;
})

const initialState = {
  id: localStorage.getItem("userId") || null,
  name: localStorage.getItem("name") || null,
  email: localStorage.getItem("email") || null,
  search: [],
  user:[],
  searchName: "",
  watchlist: null,
  loading: true,
  message: ''
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
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSeachName: (state, action) => {
      state.searchName = action.payload;
    },
    setMessage: (state, action) =>{
      state.message=action.payload;
    }
  },
  extraReducers: {
    [fetchSearch.pending]: (state) => {
      state.loading = true;
    },
    [fetchSearch.fulfilled]: (state, action) => {
      state.search = action.payload;
      state.loading = false;
    },
    [fetchSearch.rejected]: (state) => {
      state.loading = true;
    },
    [fetchUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [fetchUser.rejected]: (state) => {
      state.loading = true;
    },
  },
});
export const { setId, setName, setEmail, setGenre, setType, setSeachName, setMessage } =
  appSlice.actions;
export default appSlice.reducer;
