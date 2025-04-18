import { useEffect, useState } from "react";
import { key_imdb } from "../data/data";

//export function useMovies(query, callback) {
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    //callback?.();
    const controller = new AbortController();
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
      } catch (err) {
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
    //handleCloseMovie();  <== callback()

    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
