import { MovieStore } from "@/types/types";
import { create } from "zustand";

export const useMovieStore = create<MovieStore>((set) => ({
  movies: {
    Search: [],
    totalResults: "",
    Response: "False",
  },
  searchTitle: "",
  movie: null,
  watchedMovies: [],
  setMovies: (movies) => set({ movies }),
  setSearchTitle: (title) => set({ searchTitle: title }),
  setMovie: (movie) => set({ movie }),
}));
