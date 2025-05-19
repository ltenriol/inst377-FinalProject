const imageUrls = [];
const titles = [];
const overviews = [];
const ratings = [];
const release_dates = [];

let currentImage = 0;

const urlMovie =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_monetization_types=flatrate&watch_region=US";
const carouselImage = document.getElementById("movieImage");
const titleElement = document.getElementById("movieTitle");
const overviewElement = document.getElementById("movieOverview");
const releaseDateElement = document.getElementById("movieReleaseDate");
const ratingElement = document.getElementById("movieRating");

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
      imageUrls.push(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
      titles.push(movie.title || "Untitled");
      overviews.push(movie.overview || "No description available.");
      release_dates.push(movie.release_date || "Release date unavailable");
      ratings.push(movie.vote_average || "Rating unavailable");
    }
  });

  updateMovieDisplay();
}

function rejectMovie() {
  currentImage = (currentImage + 1) % imageUrls.length;
  updateMovieDisplay();
}

function acceptMovie() {
  const movieData = {
    title: titles[currentImage],
    overview: overviews[currentImage],
    poster_path: imageUrls[currentImage],
    release_date: release_dates[currentImage],
    vote_average: ratings[currentImage],
  };

  fetch("/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  })
    rejectMovie();
}

function updateMovieDisplay() {
  carouselImage.src = imageUrls[currentImage];
  titleElement.textContent = titles[currentImage];
  overviewElement.textContent = overviews[currentImage];
  releaseDateElement.textContent = release_dates[currentImage];
  ratingElement.textContent = ratings[currentImage];
}

fetchMovies();
