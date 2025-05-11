
export type RootStackParamList = {
  MovieScreen: undefined; 
};

export type MovieContextType = {
    getMovies: (searchTitle: string) => Promise<void>;
    getMovie: (movieId: string) => Promise<void>;
};

export interface MovieItem {
    Poster:string,
    Title:string,
    Type:string,
    Year:string,
    imdbID:string
  }
  

export interface Movies {
    Search:MovieItem[],
    totalResults: string,
    Response:string
}
export interface RatingsArray {
    Source:string,
    Value:string
}

export interface Movie {
    Actors:string,
    Awards:string,
    BoxOffice:string,
    Country:string,
    DVD:string,
    Director:string,
    Genre:string,
    Language:string,
    Metascore:string,
    Plot:string,
    Poster:string,
    Production:string,
    Rated:string,
    Ratings:RatingsArray[],
    Released:string,
    Response:string,
    Runtime:string,
    Title:string,
    Type:string,
    Website:string,
    Writer:string,
    Year:string,
    imdbID:string,
    imdbRating:string,
    imdbVotes:string,
    rating: number | undefined
  }

export interface MovieStore {
    movies: Movies;
    searchTitle: string;
    movie: Movie | null;
    watchedMovies: Movie[];
    setMovies: (movies: Movies) => void;
    setSearchTitle: (title: string) => void;
    setMovie: (movie: Movie) => void;
}

  export type WatchStatus = 'idle' | 'watching' | 'finished' | 'cancelled';
  
  export interface MovieState {
    movie: Movie | null;
    watchStatus: WatchStatus;
    watchedMovies: Movie[];
  }
 
  export interface AlertDialogProps {
    visible: boolean;
    message: string;
    onDismiss: () => void;
  }