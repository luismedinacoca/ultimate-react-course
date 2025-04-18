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
import { useLocalStorageState } from "./CustomHooks/useLocalStorageState";

export default function App() {
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // 🤙🏾 🤙🏾 Custom Hook: 🤙🏾 🤙🏾
  const { movies, isLoading, error } = useMovies(query);
  //const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  // 🤙🏾 🤙🏾 Custom Hook: 🤙🏾 🤙🏾
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectMovie = (id) => {
    //setSelectedId(id);
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  // use missing ❌  👈🏽 👈🏽 👈🏽
  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

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
