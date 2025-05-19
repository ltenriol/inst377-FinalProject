const imageUrls = [];
const titles = [];
const overviews = [];
const ratings = [];
const ratingCounts = [];


let currentImage = 0;

const urlMovie = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const carouselImage = document.getElementById("movieImage");
const titleElement = document.getElementById("movieTitle");
const overviewElement = document.getElementById("movieOverview");

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

function nextMovie() {
  currentImage = (currentImage + 1) % imageUrls.length;
  updateMovieDisplay();
}

function prevMovie() {
  currentImage = (currentImage - 1 + imageUrls.length) % imageUrls.length;
  updateMovieDisplay();
}

function updateMovieDisplay() {
  carouselImage.src = imageUrls[currentImage];
  titleElement.textContent = titles[currentImage];
  overviewElement.textContent = overviews[currentImage];
}

fetchMovies();