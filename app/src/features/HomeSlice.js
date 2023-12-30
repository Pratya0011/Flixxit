import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { homeRequest } from "../Components/request";
import axios from "axios";

export const fetchTopRated = createAsyncThunk("topRated", async () => {
  const headers = {
    access: accessToken,
    refresh: refreshToken,
  };
  const res = await axios.get(homeRequest.topRatedFlixxit,{}, { headers });
  return res.data;
});
export const fetchPopular = createAsyncThunk("popular", async () => {
  const res = await axios.get(homeRequest.popularFlixxit);
  return res.data;
});
export const fetchTopten = createAsyncThunk("topten", async () => {
  const res = await axios.get(homeRequest.toptenFlixxit);
  return res.data;
});
export const fetchDocumentary = createAsyncThunk("documentary", async () => {
  const res = await axios.get(homeRequest.documentaryFlixxit);
  return res.data;
});
export const fetchRecomended = createAsyncThunk("recomended", async (genre) => {
  const res = await axios.get(`${homeRequest.recomendedFlixxit}?genre=${genre}`);
  return res.data;
});

const initialState = {
  toprated: [],
  popular: [],
  topten: [],
  documentary: [],
  recomended: [],
  loading: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTopRated.pending]: (state) => {
      state.loading = true;
    },
    [fetchTopRated.fulfilled]: (state, action) => {
      state.loading = false;
      state.toprated = action.payload;
    },
    [fetchTopRated.rejected]: (state) => {
      state.loading = true;
    },
    [fetchPopular.pending]: (state) => {
      state.loading = true;
    },
    [fetchPopular.fulfilled]: (state, action) => {
      state.loading = false;
      state.popular = action.payload;
    },
    [fetchPopular.rejected]: (state) => {
      state.loading = true;
    },
    [fetchTopten.rejected]: (state) => {
      state.loading = true;
    },
    [fetchTopten.fulfilled]: (state, action) => {
      state.loading = false;
      state.topten = action.payload;
    },
    [fetchTopten.rejected]: (state) => {
      state.loading = true;
    },
    [fetchDocumentary.pending]: (state) => {
      state.loading = true;
    },
    [fetchDocumentary.fulfilled]: (state, action) => {
      state.loading = false;
      state.documentary = action.payload;
    },
    [fetchDocumentary.rejected]: (state, action) => {
      state.loading = true;
    },
    [fetchRecomended.pending]: (state) => {
      state.loading = true;
    },
    [fetchRecomended.fulfilled]: (state, action) => {
      state.loading = false;
      state.recomended = action.payload;
      console.log(state.recomended)
    },
    [fetchRecomended.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});
export default homeSlice.reducer;
