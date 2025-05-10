import { create } from "zustand";

interface Movie {
  id: string;
  title: string;
  year: string;
  [key: string]: any;
}

interface MovieStore {
  movies: Movie[];
  searchTitle: string;
  movie: Movie | null;
  watchedMovies: Movie[];
  setMovies: (movies: Movie[]) => void;
  clearMovies: () => void;
  setSearchTitle: (title: string) => void;
  setMovie: (movie: Movie) => void;
  clearMovie: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  searchTitle: "",
  movie: null,
  watchedMovies: [],
  setMovies: (movies) => set({ movies }),
  clearMovies: () => set({ movies: [] }),
  setSearchTitle: (title) => set({ searchTitle: title }),
  setMovie: (movie) => set({ movie }),
  clearMovie: () => set({ movie: null }),
}));
