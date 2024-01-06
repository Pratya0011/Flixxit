import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { tvRequest } from "../Components/request";
import {get} from '../Custom/useApi'

export const fetchTopRated = createAsyncThunk("topRated", async () => {
    const res = await get(tvRequest.topRatedTv);
    return res.data;
  });
  export const fetchPopular = createAsyncThunk("topPopula", async () => {
    const res = await get(tvRequest.popularTv);
    return res.data;
  });
   // Crime Tv
   export const fetchCrimeTv = createAsyncThunk("crime", async () => {
    const res = await get(tvRequest.crimeTv);
    return res.data;
  });
  // Drama Tv
  export const fetchDramaTv = createAsyncThunk("drama", async () => {
    const res = await get(tvRequest.dramaTv);
    return res.data;
  });
  // Action and Adventures TV Shows
  export const fetchActionadventure = createAsyncThunk("actionadventure", async () => {
    const res = await get(tvRequest.actionadventureTv);
    return res.data;
  });
  // Comedy TV shows
  export const fetchComedyTv = createAsyncThunk("comedy", async () => {
    const res = await get(tvRequest.comedyTv);
    return res.data;
  });
  // Mystery TV Showss
  export const fetchMystery = createAsyncThunk("mystery", async () => {
    const res = await get(tvRequest.mysteryTv);
    return res.data;
  });
  // Documentaries
  export const fetchDocumentaryTv = createAsyncThunk("documentaries", async () => {
    const res = await get(tvRequest.documentaryTv);
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
          [fetchCrimeTv.pending]: (state) => {
            state.loading = true;
          },
          [fetchCrimeTv.fulfilled]: (state, action) => {
            state.loading = false;
            state.crime = action.payload;
          },
          [fetchCrimeTv.rejected]: (state) => {
            state.loading = true;
          },
          [fetchComedyTv.pending]: (state) => {
            state.loading = true;
          },
          [fetchComedyTv.fulfilled]: (state, action) => {
            state.loading = false;
            state.comedy = action.payload;
          },
          [fetchComedyTv.rejected]: (state) => {
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
          [fetchDramaTv.pending]: (state) => {
            state.loading = true;
          },
          [fetchDramaTv.fulfilled]: (state, action) => {
            state.loading = false;
            state.drama = action.payload;
          },
          [fetchDramaTv.rejected]: (state) => {
            state.loading = true;
          },
          [fetchDocumentaryTv.pending]: (state) => {
            state.loading = true;
          },
          [fetchDocumentaryTv.fulfilled]: (state, action) => {
            state.loading = false;
            state.documentary = action.payload;
          },
          [fetchDocumentaryTv.rejected]: (state) => {
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