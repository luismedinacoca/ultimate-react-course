import { useEffect } from "react";

const Search = ({ query, setQuery }) => {
  useEffect(() => {
    const searchBox = document.querySelector(".search");
    console.log(searchBox);
    searchBox.focus();
  }, [query]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
