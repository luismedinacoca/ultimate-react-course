import { useState } from "react";
import { tempWatchedData } from "../../data/data";
import WatchedSummary from "../WatchedSummary/WatchedSummary";
import WatchedMoviesList from "../WatchedMoviesList/WatchedMoviesList";

const WatchedBox = () => {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        type="button"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
};

export default WatchedBox;
