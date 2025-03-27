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

  /**
    //fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=Adolescence`)
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=Interstellar}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.Response);
        // console.log(data.totalResults);
        console.log(data.Search);
        //setMovies(data.Search); // ❌ Re-renders in a endless loop.
        //setWatched([]); // ❌ Re-renders in a endless loop.
      });
  */

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=adolescence}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search);
        console.log(data.Search);
      });
  }, []);
  /*
    [] - empty array => dependency array! => it executes only once.
    Mount component lifecycle!!
    It works when component renders for the first time.
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
