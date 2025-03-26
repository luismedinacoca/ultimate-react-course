import StarRating from "../StarRating/StarRating";
import { useState } from "react";

const Test = () => {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="green" maxRating={10} onSetRating={setMovieRating} />
      <p>
        This movie was rated {movieRating}{" "}
        <span>{movieRating >= 2 ? "stars" : "star"}</span>.
      </p>
    </div>
  );
};

export default Test;
