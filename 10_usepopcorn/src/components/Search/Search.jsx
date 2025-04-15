import { useEffect, useRef } from "react";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    //console.log(">> ", inputEl.current);
    function callback(e) {
      /* Hit enter key when it's already focussed, don't do anything */
      if (document.activeElement === inputEl.current) return;

      /*
      Hit enter key then search component is selected or on focus
      */
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback);
    //inputEl.current.focus();

    return () => document.addEventListener("keydown", callback);
  }, [setQuery]);

  // useEffect(() => {
  //   const searchBox = document.querySelector(".search");
  //   console.log(searchBox);
  //   searchBox.focus();
  // }, [query]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
