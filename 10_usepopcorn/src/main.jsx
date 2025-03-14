import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import StarRating from "./StarRating.jsx";
import { useState } from "react";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating size={24} color="red" defaultRating={1} />
    <StarRating size={32} color="green" defaultRating={3} />
    <StarRating
      maxRating={5}
      messages={["Starting", "In progres", "Okay", "Good", "Amazing"]}
    />

    <Test />
  </StrictMode>
);
