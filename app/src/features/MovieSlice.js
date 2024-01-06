import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { movieRequest } from "../Components/request";
import apiService from "../Custom/AxiosService";
import {get} from '../Custom/useApi'

export const fetchTopRated = createAsyncThunk("topRated", async () => {
    const res = await get(movieRequest.topRatedMovies);
    return res.data;
  });
  export const fetchPopular = createAsyncThunk("popular", async () => {
    const res = await get(movieRequest.popularMovies);
    return res.data;
  });
  // Thriller movies
  export const fetchThriller = createAsyncThunk("thriller", async () => {
    const res = await get(movieRequest.thrillerMovies);
    return res.data;
  });
  // Crime Movies
  export const fetchCrime = createAsyncThunk("crime", async () => {
    const res = await get(movieRequest.crimeMovies);
    return res.data;
  });
  // Drama Movie
  export const fetchDrama = createAsyncThunk("drama", async () => {
    const res = await get(movieRequest.dramaMovies);
    return res.data;
  });
  // Action Movie
  export const fetchAction = createAsyncThunk("action", async () => {
    const res = await get(movieRequest.actionMovies);
    return res.data;
  });
  // Adventure Movie
  export const fetchAdventure = createAsyncThunk("adventure", async () => {
    const res = await get(movieRequest.adventureMovies);
    return res.data;
  });
  // Comedy Movie
  export const fetchComedy = createAsyncThunk("comedy", async () => {
    const res = await get(movieRequest.comedyMovies);
    return res.data;
  });
  // Horror Movie
  export const fetchHorror = createAsyncThunk("horror", async () => {
    const res = await get(movieRequest.horrorMovies);
    return res.data;
  });
  // Romantic Movie
  export const fetchRomance = createAsyncThunk("romance", async () => {
    const res = await get(movieRequest.romanceMovies);
    return res.data;
  });
  // Documentary Movie
  export const fetchDocumentary = createAsyncThunk("documentary", async () => {
    const res = await get(movieRequest.documentaryMovies);
    return res.data;
  });

const initialState = {
    topratedmovies : [],
    popularmovies: [],
    thriller: [],
    crime : [],
    drama: [],
    action: [],
    adventure: [],
    comedy: [],
    horror: [],
    romance: [],
    documentary: [],
    loading: true
}

export const movieSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchTopRated.pending]: (state) => {
            state.loading = true;
          },
          [fetchTopRated.fulfilled]: (state, action) => {
            state.loading = false;
            state.topratedmovies = action.payload;
          },
          [fetchTopRated.rejected]: (state) => {
            state.loading = true;
          },
          [fetchPopular.pending]: (state) => {
            state.loading = true;
          },
          [fetchPopular.fulfilled]: (state, action) => {
            state.loading = false;
            state.popularmovies = action.payload;
          },
          [fetchPopular.rejected]: (state) => {
            state.loading = true;
          },
          [fetchThriller.pending]: (state) => {
            state.loading = true;
          },
          [fetchThriller.fulfilled]: (state, action) => {
            state.loading = false;
            state.thriller = action.payload;
          },
          [fetchThriller.rejected]: (state) => {
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
          [fetchAction.pending]: (state) => {
            state.loading = true;
          },
          [fetchAction.fulfilled]: (state, action) => {
            state.loading = false;
            state.action = action.payload;
          },
          [fetchAction.rejected]: (state) => {
            state.loading = true;
          },
          [fetchAdventure.pending]: (state) => {
            state.loading = true;
          },
          [fetchAdventure.fulfilled]: (state, action) => {
            state.loading = false;
            state.adventure = action.payload;
          },
          [fetchAdventure.rejected]: (state) => {
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
          [fetchHorror.pending]: (state) => {
            state.loading = true;
          },
          [fetchHorror.fulfilled]: (state, action) => {
            state.loading = false;
            state.horror = action.payload;
          },
          [fetchHorror.rejected]: (state) => {
            state.loading = true;
          },
          [fetchRomance.pending]: (state) => {
            state.loading = true;
          },
          [fetchRomance.fulfilled]: (state, action) => {
            state.loading = false;
            state.romance = action.payload;
          },
          [fetchRomance.rejected]: (state) => {
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
    }
})
export default movieSlice.reducer