# The Ultimate React Course 2023: React, Redux & More

[EduITFree](https://eduitfree.xyz/course/the-ultimate-react-course-2023-react-redux-more)

# Section 12 - Lecture 145: Using an async Function

```js
useEffect(() => {
  async function fetchMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${KEY}&s=${query}}`
    );
    const data = await res.json();
    setMovies(data.Search);
    console.log("movies: ", movies);
    console.log("data.Search: ", data.Search);
  }

  fetchMovies();
}, []);
```

Even this useEffect and the async fetchMovie function, movie is still an empty array however data.Search array is having all data we need.

<img src="./images/section12lecture145 - useEffect-result movies and data.Search .png">
