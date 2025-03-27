import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./data/data";

import Search from "./components/Search/Search";
import NumResult from "./components/NumResult/NumResult";

//import ListBox from "./components/ListBox/ListBox";
//import WatchedBox from "./components/WatchedBox/WatchedBox";

import MovieList from "./components/MovieList/MovieList";

import Box from "./components/Box/Box";

import WatchedSummary from "./components/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList/WatchedMoviesList";

//import StarRating from "./components/StarRating/StarRating";

const KEY = "f84fc31d";

export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const query = "adolescence";

  useEffect(() => {
    // async function which has the await keyword.
    async function fetchMovies() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}}`
      );
      const data = await res.json();
      setMovies(data.Search);
      console.log("movies: ", movies);
      console.log("data.Search: ", data.Search);
    }

    //calling the fetchMovies function
    fetchMovies();
  }, []);

  /* 
    ❌ useEffect() hook never is async.
    
    useEffect( async () => {
      await fetch(`URL`)})
  */

  return (
    <>
      <Navbar>
        <Search />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
