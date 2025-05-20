// Creating space for the movie datas
const imageUrls = [];
const titles = [];
const overviews = [];
const ratings = [];
const ratingCounts = [];


let currentImage = 0;

// URL and elements that display the data
const urlMovie = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const carouselImage = document.getElementById("movieImage");
const titleElement = document.getElementById("movieTitle");
const overviewElement = document.getElementById("movieOverview");

// Fetching the data
async function fetchMovies() {
  const res = await fetch(urlMovie, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTc5NmE2YThmZGZhODNjNzQ0YzNhMTFmOTM3MGY3NiIsIm5iZiI6MTc0NTI5NjMyNi4yNzEwMDAxLCJzdWIiOiI2ODA3MWJjNmUzZmFjMmY5MDI4YTMxZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XeJjKvrJdiClO2DOlt2DchPgVyUnzfo4fBZ5PD9xlQk",
      Accept: "application/json",
    },
  });

  const data = await res.json();
  const movies = data.results;

  // Filling in the arrays with data
  movies.forEach((movie) => {
    if (movie.poster_path) {
      imageUrls.push(
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      );
      titles.push(movie.title || "Untitled");
      overviews.push(movie.overview || "No description available.");
    }
  });

  updateMovieDisplay();
}

// Shuffles to next movie
function nextMovie() {
  currentImage = (currentImage + 1) % imageUrls.length;
  updateMovieDisplay();
}

// Shuffles to previous movie
function prevMovie() {
  currentImage = (currentImage - 1 + imageUrls.length) % imageUrls.length;
  updateMovieDisplay();
}

// Updates the card with movie
function updateMovieDisplay() {
  carouselImage.src = imageUrls[currentImage];
  titleElement.textContent = titles[currentImage];
  overviewElement.textContent = overviews[currentImage];
}

fetchMovies();