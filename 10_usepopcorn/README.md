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

# Section 12 - Lecture 156: Cleaning Up Data Fetching

> Issues:
>
> 1. Many request happening at same time
> 2. Having many request happening at the same time slow each of them down (fetching).
> 3. End up downloading to much data (no interested in other queries).
> 4. In case one request takes so much time it would be the last to arrive, so it would be rendered and it's not what we expect. (We need the last request no the last in arriving).

<img src="./readme-images/section12lecture156-parallelDownload.png" alt="">

Fixing:

Need to create a controller:

```js
const controller = new AbortController();
```

addding this controller as parameter in the fetch function:

```js
const res = await fetch(
  `http://www.omdbapi.com/?apikey=${key_imdb.KEY}&s=${query}`,
  { signal: controller.signal }
);
```

then add the abort function at the end, right after the `fetchMovies()`:

```js
return () => {
  controller.abort();
};
```

However we are getting this error:
<img src="./readme-images/section12lecture156-signalIsAbort.png">

Fixing, adding inside catching error section a skipping for AbortError:

```js
catch (err) {
  if (err.name !== "AbortError") {
    setError(err.message);
  }
  setError("");
}
```
