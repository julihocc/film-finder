// Step 1
const tmdbKey = "87fd948437b8353b35f04dc60f35a50e";
// Step 2
const tmdbBaseUrl = "https://api.themoviedb.org/3";
console.log(tmdbBaseUrl);
const playBtn = document.getElementById("playBtn");
// Step 6
const getGenres = async () => {
  // Step 3
  const genreRequestEndpoint = "/genre/movie/list";
  console.log(genreRequestEndpoint);
  // Step 4
  const requestParams = `?api_key=${tmdbKey}`;
  console.log(requestParams);
  // Step 5
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  // Step 7
  try {
    // Step 8
    const response = await fetch(urlToFetch);
    // Step 9
    if (response.ok) {
      // Step 10
      const jsonResponse = await response.json();
      // Step 11
      console.log("jsonResponse: ", jsonResponse);
      const genres = jsonResponse.genres;      
      console.log("genres: ", genres);
      // Step 12
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

// step 15
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  // Step 13
  const discoverMovieEndpoint = "/discover/movie";
  // Step 14
  const requestParams = `?api_key=${tmdbKey}&with_genres${selectedGenre}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  console.log('urlToFetch in getMovies: ', urlToFetch)
  try {
    // step 16
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const movies = jsonResponse.results;
      console.log('movies: ', movies)
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

console.log(getMovies());

// step 21
const getMovieInfo = async (movie) => {
  // step 18
  movieId = movie.id;
  // step 19
  movieEndpoint = `/movie/${movie.id}`;
  // step 20
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch);
    //step 22
    if (response.ok) {
      const movieInfo = await response.json();
    
    // step 23
    console.log('movieInfo: ', movieInfo)
    return movieInfo
    }
  } catch (error) {
    console.log('getMovieInfo error: ', error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
// step 24
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  // step 25
  const randomMovie = getRandomMovie(movies);
  // step 26
  const info = await getMovieInfo(randomMovie);
  // step 27
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
