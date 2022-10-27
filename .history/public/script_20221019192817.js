// Step 1: Save the API key you obtained from the TMDB API to the tmdbKey variable. We’ll be making multiple calls to the TMDB API and will reference this key in the upcoming steps.Remember not to share this API key with others!
const tmdbKey = "87fd948437b8353b35f04dc60f35a50e";
// Step 2: Check the TMDB documentation to find the API’s base URL, and save it to the tmdbBaseUrl variable. We will append specific endpoints to this URL for each of our requests to the TMDB API.
const tmdbBaseUrl = "https://api.themoviedb.org/3";
console.log(tmdbBaseUrl);
const playBtn = document.getElementById("playBtn");
// Step 6: Turn getGenres() into an asynchronous function that returns a promise. We’ll include our fetch() request in this function, and making it asynchronous will simplify handling the promise our API call returns.
const getGenres = async () => {
  // Step 3: For the next several steps we’ll be working inside the getGenres() function to fetch a list of genres from the API. Check the TMDB documentation to find the “Genres” API endpoint. Create a variable called genreRequestEndpoint inside getGenres() and set it to the “Genres” API endpoint.
  const genreRequestEndpoint = "/genre/movie/list";
  console.log(genreRequestEndpoint);
  // Step 4: We will use query parameters to add more specificity to our request. Still inside the getGenres() function, create a variable called requestParams and set it to a query string where the key is api_key and the value is tmdbKey.
  const requestParams = `?api_key=${tmdbKey}`;
  console.log(requestParams);
  // Step 5: Let’s put together the URL where we’ll send our fetch request. Create a variable called urlToFetch and set it to a string that consists of tmdbBaseUrl, followed by genreRequestEndpoint, followed by requestParams.
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  // Step 7: We need a straightforward way to catch and handle errors if our fetch() request fails. Underneath our variable declarations inside the getGenres() function, add a try/catch statement. Leave the try block empty for now. In the catch block, log caught errors to the console.
  try {
    // Step 8: In the try block, use fetch() to send a GET request to urlToFetch. Await the response and save it to a variable called response. We need to await the resolution of our fetch() call so that we can do something with the data we get back.
    const response = await fetch(urlToFetch);
    // Step 9: Still inside the try block, create a conditional statement that checks if the .ok property of the response object evaluates to a truthy value.
    if (response.ok) {
      // Step 10: Inside the if statement of our try block, we’ll capture the data that we need to populate our dropdown menu. To get the requested data, convert the response object to a JSON object. Await the resolution of this method and save it to a variable called jsonResponse.
      const jsonResponse = response.json();
      // Step 11: To make sure your code is working, log jsonResponse to the console inside our if statement. You should see a single object with a single key, genres. The value of genres is an array that lists TMDB’s genres.
      // Save the genres property of jsonResponse in a variable called genres. Log this variable to the console to confirm that it contains the correct information.
      console.log("jsonResponse: ", jsonResponse);
      const genres = jsonResponse.genres;
      console.log("genres: ", genres);
      // Step 12; Return genres as the very last line of the if statement inside our try block of the getGenres() function.
      // When you run your program, you should now be able to see your dropdown menu populated with genres!
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = () => {
  const selectedGenre = getSelectedGenre();
};

const getMovieInfo = () => {};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
