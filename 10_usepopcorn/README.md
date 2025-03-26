# The Ultimate React Course 2023: React, Redux & More

[EduITFree](https://eduitfree.xyz/course/the-ultimate-react-course-2023-react-redux-more)

# Installing Prop-Types:

```js
$ npm install prop-types
```

# Section 12 - Lecture 142:

## Go to [OMDb API | The Open Movie Database](https://omdbapi.com/)

Get the API_KEY:

1. Click on `API Key` tab, next to `Change Log`. Now you get to URL: [API Key](https://omdbapi.com/apikey.aspx).
2. In Generate API Key and Account Type, click on `FREE(1,000 daily limit)` radio button.
3. Fill or complete the form:
   1. Email
   2. Name
      - First Name
      - Last Name
   3. Use
4. Click on `OMDb API` on the left top side in order to go back the previous page.
5. Scroll to `Usage` then copy the URL in Send all data request to:

   > http://www.omdbapi.com/?apikey=[yourkey]&

6. Add in App component as:

   > const KEY = 'f84fc31d';

   ```js
   fetch(`http://www.omdbapi.com/?apikey=[KEY]&`)
     .then((res) => res.json())
     .then((data) => console.log(data));
   ```

7. Searching for a specific movie

   > http://www.omdbapi.com/?apikey=[yourkey]&s[MOVIE_NAME]
