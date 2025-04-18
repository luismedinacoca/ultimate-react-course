import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { useEffect, useState } from "react";

import Search from "./components/Search/Search";
import NumResult from "./components/NumResult/NumResult";

import MovieList from "./components/MovieList/MovieList";

import Box from "./components/Box/Box";
import Loader from "./components/Loader/Loader";

import WatchedSummary from "./components/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList/WatchedMoviesList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
//import { key_imdb } from "./data/data";
import { useMovies } from "./CustomHooks/useMovies";

export default function App() {
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // 🤙🏾 🤙🏾 Custom Hook: 🤙🏾 🤙🏾
  const { movies, isLoading, error } = useMovies(query);
  //const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  }); //getting the initial value from localStorage

  const handleSelectMovie = (id) => {
    //setSelectedId(id);
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  // use missing ❌
  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);

    //creating local storage saving => without using useEffect depending on watched array.
    //localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));

    // Getting the local storage value => without using useEffect depending on watched array.
    //JSON.parse(localStorage.getItem("watched"));
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   // async function which has the await keyword.
  //   async function fetchMovies() {
  //     try {
  //       setIsLoading(true);
  //       setError("");
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${key_imdb.KEY}&s=${query}`,
  //         { signal: controller.signal }
  //       );
  //       const data = await res.json();

  //       //In case of input error
  //       if (data.Response === "False") throw new Error("Movie not found!");

  //       //In case of connection error:
  //       if (!res.ok) {
  //         throw new Error("Something went wrong with fetching movies");
  //       }

  //       if (query.length < 3) {
  //         setMovies([]);
  //         setError("");
  //         return;
  //       }
  //       setMovies(data.Search);
  //       //console.log(data.Search);
  //     } catch (err) {
  //       //console.log(err.message);
  //       if (err.name !== "AbortError") {
  //         setError(err.message);
  //       }
  //       setError("");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   /**
  //    * In order to close the MovieDetails when user search in the Search component
  //    */
  //   handleCloseMovie();

  //   fetchMovies();
  //   return () => {
  //     controller.abort();
  //   };
  // }, [query]);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched} // watched array
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
