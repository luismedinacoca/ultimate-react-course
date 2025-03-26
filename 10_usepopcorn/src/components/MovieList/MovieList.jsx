import { useState } from "react";
import { tempMovieData } from "../../data/data";
import Movie from "../Movie/Movie";

const MovieList = ({ movies }) => {
  //const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default MovieList;
