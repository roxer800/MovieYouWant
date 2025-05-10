import { useMovieStore } from '@/stores/MovieStore';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationFunction } from '../utils/notificationFunction'


export interface Movie {
  id: string;
  title: string;
  year: string;
  rating?: number;
  [key: string]: any;
}

export type WatchStatus = 'idle' | 'watching' | 'finished' | 'cancelled';

interface MovieState {
  movie: Movie | null;
  watchStatus: WatchStatus;
  watchedMovies: Movie[];
}

const initialState: MovieState = {
  movie: null,
  watchStatus: 'idle',
  watchedMovies: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<Movie>) => {
      state.movie = action.payload;
    },
    startWatching: (state, action: PayloadAction<Movie>) => {
      state.watchStatus = 'watching';
      state.movie = action.payload;

      notificationFunction(
        'Movie Started',
        `You started watching ${state.movie}`
      );
    },
    endWatching: (state) => {
      state.watchStatus = 'idle';
      state.movie = null;
    },
    setFinished: (state) => {
        state.watchStatus = 'idle';
        if (state.movie && !state.watchedMovies.find(m => m.imdbID === state.movie?.imdbID)) {
          state.watchedMovies.push(state.movie); 
        }
        state.movie = null;
      },
      setRating: (state, action) => {
        state.watchedMovies = state.watchedMovies.map((movie) =>
          movie.imdbID === action.payload.id
            ? { ...movie, rating: action.payload.rating }
            : movie
        );
      }
      
      
    },
});

export const { setMovie, startWatching, endWatching, setFinished, setRating  } = movieSlice.actions;
export default movieSlice.reducer;
