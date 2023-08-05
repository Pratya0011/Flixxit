import axios from "axios";
import dotenv from "dotenv";
import { url } from "./url.js";

dotenv.config();
export const movieList = async () => {
  try {
    var allMovies = [];
    for (let i = 1; i < 6; i++) {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: process.env.API_KEY,
            page: i,
            with_original_language: "hi",
            include_video: false,
            include_adult: false,
          },
        }
      );
      const movies = res.data.results;
      allMovies.push(...movies);
    }
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: process.env.API_KEY,
        page: 1,
        with_original_language: "hi",
        with_genres: 99,
        include_video: false,
        include_adult: false,
      },
    });
    const docMovies = res.data.results;
    allMovies.push(...docMovies);
    const movieList = allMovies.map((movie) => {
      movie.media_type = "movie";
      movie.media_url = url[Math.floor(Math.random() * url.length)];
      return movie;
    });
    console.log('success')
    return movieList;
  } catch (err) {
    console.log(err);
    console.log("Error in fetching data from the movie db");
  }
};
export const tvList = async () => {
  try {
    let allTvShows = [];
    for (let i = 1; i < 6; i++) {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
        params: {
          api_key: process.env.API_KEY,
          page: i,
          with_original_language: "hi",
          include_video: false,
          without_genres: "10766,10767,10764,10736",
          include_adult: false,
          "vote_count.gte": "20",
        },
      });
      const tv = res.data.results;
      allTvShows.push(...tv);
    }

    const res = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
      params: {
        api_key: process.env.API_KEY,
        page: 1,
        with_original_language: "hi",
        with_genres: 99,
        include_video: false,
        include_adult: false,
      },
    });
    const doctv = res.data.results;
    allTvShows.push(...doctv);
    const tvList = allTvShows.map((tv) => {
      tv.media_type = "tv";
      tv.media_url = url[Math.floor(Math.random() * url.length)];
      console.log('success')
      return tv;
    });
    return tvList;
  } catch (err) {
    console.log("Error in fetching data from the  db");
  }
};
