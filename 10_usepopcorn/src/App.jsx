import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { useEffect, useState } from "react";

import Search from "./components/Search/Search";
import NumResult from "./components/NumResult/NumResult";

import MovieList from "./components/MovieList/MovieList";

import Box from "./components/Box/Box";

import WatchedSummary from "./components/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList/WatchedMoviesList";

const KEY = "f84fc31d";
// const KEY = "40abff28";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Inception");
  //const tempQuery = "adolescence";
  /*
  useEffect(() => {
    console.log("After initial render");
  }, []);

  useEffect(() => {
    console.log("After every render");
  });

  useEffect(() => {
    console.log("D");
  }, [query]);

  console.log("");
  console.log("During render");
  */

  useEffect(() => {
    // async function which has the await keyword.
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();

        //In case of input error
        if (data.Response === "False") throw new Error("Movie not found!");

        //In case of connection error:
        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
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
  }, [query]);

  return (
    <>
      <Navbar>
        <Search qeury={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
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
