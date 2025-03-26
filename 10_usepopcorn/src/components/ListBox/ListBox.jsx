import { useState } from "react";
import MovieList from "../MovieList/MovieList";

const ListBox = ({ children }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        type="button"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {/* children with curly braces => it's an object */}
      {isOpen1 && children}
    </div>
  );
};

export default ListBox;
