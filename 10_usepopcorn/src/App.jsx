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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const query = "swefdeiu";

  useEffect(() => {
    // async function which has the await keyword.
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}}`
        );
        const data = await res.json();
        console.log(data);
        //In case of input error
        if (data.Response === "False") throw new Error("Movie not found!");

        //In case of connection error:
        if (!res.ok()) {
          throw new Error("Something went wrong with fetching movies");
        }

        setMovies(data.Search);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <Navbar>
        <Search />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">LOADING ....</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
