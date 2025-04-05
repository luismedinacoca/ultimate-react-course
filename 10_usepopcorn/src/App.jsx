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
import { key_imdb } from "./data/data";

//const KEY = "f84fc31d";
// const KEY = "40abff28";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
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

  const handleSelectMovie = (id) => {
    //setSelectedId(id);
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  //TODO: ESC key could continue push down and the console.log() will be displayed. Even when movie details is already not shown.
  // useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     if (e.code === "Escape") {
  //       handleCloseMovie();
  //       console.log("📌 Closing by ESC keydown!!");
  //     }
  //   });
  // }, []); //Move to MovieDetail component and fix it there

  useEffect(() => {
    const controller = new AbortController();
    // async function which has the await keyword.
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key_imdb.KEY}&s=${query}`,
          { signal: controller.signal }
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
        //console.log(data.Search);
      } catch (err) {
        //console.log(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
        setError("");
      } finally {
        setIsLoading(false);
      }
    }

    /**
     * In order to close the MovieDetails when user search in the Search component
     */
    handleCloseMovie();

    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

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

// function Loader() {
//   return <p className="loader">LOADING ....</p>;
// }

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
