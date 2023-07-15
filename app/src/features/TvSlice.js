import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { tvRequest } from "../Components/request";
import axios from "axios";

export const fetchTopRated = createAsyncThunk("topRated", async () => {
    const res = await axios.get(tvRequest.topRatedTv);
    return res.data;
  });
  export const fetchPopular = createAsyncThunk("topPopula", async () => {
    const res = await axios.get(tvRequest.popularTv);
    return res.data;
  });
   // Crime Tv
   export const fetchCrime = createAsyncThunk("crime", async () => {
    const res = await axios.get(tvRequest.crimeTv);
    return res.data;
  });
  // Drama Tv
  export const fetchDrama = createAsyncThunk("drama", async () => {
    const res = await axios.get(tvRequest.dramaTv);
    return res.data;
  });
  // Action and Adventures TV Shows
  export const fetchActionadventure = createAsyncThunk("actionadventure", async () => {
    const res = await axios.get(tvRequest.actionadventureTv);
    return res.data;
  });
  // Comedy TV shows
  export const fetchComedy = createAsyncThunk("comedy", async () => {
    const res = await axios.get(tvRequest.comedyTv);
    return res.data;
  });
  // Mystery TV Showss
  export const fetchMystery = createAsyncThunk("mystery", async () => {
    const res = await axios.get(tvRequest.mysteryTv);
    return res.data;
  });
  // Documentaries
  export const fetchDocumentary = createAsyncThunk("documentaries", async () => {
    const res = await axios.get(tvRequest.documentaryTv);
    return res.data;
  });


const initialState = {
    topratedtv : [],
    populartv : [],
    crime: [],
    drama:[],
    actionadventure:[],
    comedy:[],
    mystery:[],
    documentary:[],
    loading:true
}

const tvSlice = createSlice({
    name:"tv",
    initialState,
    reducers:{},
    extraReducers:{
        [fetchTopRated.pending]: (state) => {
            state.loading = true;
          },
          [fetchTopRated.fulfilled]: (state, action) => {
            state.loading = false;
            state.topratedtv = action.payload;
          },
          [fetchTopRated.rejected]: (state) => {
            state.loading = true;
          },
          [fetchPopular.pending]: (state) => {
            state.loading = true;
          },
          [fetchPopular.fulfilled]: (state, action) => {
            state.loading = false;
            state.populartv = action.payload;
          },
          [fetchPopular.rejected]: (state) => {
            state.loading = true;
          },
          [fetchCrime.pending]: (state) => {
            state.loading = true;
          },
          [fetchCrime.fulfilled]: (state, action) => {
            state.loading = false;
            state.crime = action.payload;
          },
          [fetchCrime.rejected]: (state) => {
            state.loading = true;
          },
          [fetchComedy.pending]: (state) => {
            state.loading = true;
          },
          [fetchComedy.fulfilled]: (state, action) => {
            state.loading = false;
            state.comedy = action.payload;
          },
          [fetchComedy.rejected]: (state) => {
            state.loading = true;
          },
          [fetchMystery.pending]: (state) => {
            state.loading = true;
          },
          [fetchMystery.fulfilled]: (state, action) => {
            state.loading = false;
            state.mystery = action.payload;
          },
          [fetchMystery.rejected]: (state) => {
            state.loading = true;
          },
          [fetchDrama.pending]: (state) => {
            state.loading = true;
          },
          [fetchDrama.fulfilled]: (state, action) => {
            state.loading = false;
            state.drama = action.payload;
          },
          [fetchDrama.rejected]: (state) => {
            state.loading = true;
          },
          [fetchDocumentary.pending]: (state) => {
            state.loading = true;
          },
          [fetchDocumentary.fulfilled]: (state, action) => {
            state.loading = false;
            state.documentary = action.payload;
          },
          [fetchDocumentary.rejected]: (state) => {
            state.loading = true;
          },
          [fetchActionadventure.pending]: (state) => {
            state.loading = true;
          },
          [fetchActionadventure.fulfilled]: (state, action) => {
            state.loading = false;
            state.actionadventure = action.payload;
          },
          [fetchActionadventure.rejected]: (state) => {
            state.loading = true;
          },
    }
})

export default tvSlice.reducer