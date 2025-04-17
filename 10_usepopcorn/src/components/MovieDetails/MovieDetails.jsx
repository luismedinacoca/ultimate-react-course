import { useEffect, useState, useRef } from "react";
import { key_imdb } from "../../data/data";
import StarRating from "../StarRating/StarRating";
import Loader from "../Loader/Loader";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);
  // let count = 0;

  useEffect(() => {
    if (userRating) {
      //countRef.current = countRef.current + 1;
      countRef.current += 1;
      // count++;
    }
    // }, [userRating, count]);
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  //console.log(isWatched);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  //Using useEfect:
  /*
  const [isTop, setIsTop] = useState(imdbRating > 8);
  console.log("Is top?", isTop);

  useEffect( () => {
    setIsTop(imdbRating > 8);  
  }, [imdbRating]);
  */

  //Variable
  /*
  const isTop = imdbRating > 8;
  console.log(
    `${title} has imdbRating ${imdbRating}: Is this movie top? ${isTop}`
  );
  */

  /* new useState hook */
  //const [avgRating, setAvgRating] = useState(0);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
      // count,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();

    /*
    setAvgRating(Number(imdbRating));
    setAvgRating((avgRating) => (avgRating + userRating) / 2);
    */
  };

  useEffect(() => {
    const callBack = (e) => {
      if (e.code === "Escape") {
        onCloseMovie();
        //console.log("📌 Closing by ESC keydown!!");
      }
    };

    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key_imdb.KEY}&i=${selectedId}`
      );
      const data = await res.json();

      setMovie(data);
      setIsLoading(false);
    };

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
      //console.log(`Clean up effect for 🎬 ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button type="button" className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span> {imdbRating} IMDb rating
              </p>
              {/* <p>Average Rating: {avgRating}</p> */}
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      type="button"
                      className="btn-add"
                      onClick={handleAdd}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You've already rated this movie: {watchedUserRating}{" "}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
