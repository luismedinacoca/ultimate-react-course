import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StarRating from "./components/StarRating/StarRating.jsx";
import Test from "./components/Test/Test.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating maxRating={6} />
    <StarRating />
    <StarRating size={34} color="red" className="test" />
    <StarRating
      size={34}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      color="blue"
    />
    <Test /> */}
  </StrictMode>
);
