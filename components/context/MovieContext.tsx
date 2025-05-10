// AppContext.tsx
import { useMovieStore } from "@/stores/MovieStore";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Constants from "expo-constants";

type MovieContextType = {
  search: string;
  setSearch: (value: string) => void;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieContextProvider = ({ children }: { children: ReactNode }) => {
  const { setMovies, setMovie } = useMovieStore();
  const { apiUrl, apiKey } = Constants.expoConfig?.extra || {};

  async function getMovies(searchTitle: string) {
    const res = await fetch(`${apiUrl}/?apikey=${apiKey}&s=${searchTitle}`);
    const data = await res.json();
    setMovies(data);
  }

  async function getMovie(movieId: string) {
    const res = await fetch(`${apiUrl}/?apikey=${apiKey}&i=${movieId}`);
    const data = await res.json();
    setMovie(data);
  }

  return (
    <MovieContext.Provider value={{ getMovies, getMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
