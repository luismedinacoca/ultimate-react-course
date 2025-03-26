import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { useState } from "react";
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

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
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
