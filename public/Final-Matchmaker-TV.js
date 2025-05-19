const tvImageUrls = [];
const tvTitles = [];
const tvOverviews = [];
const tvRatings = [];
const tvRelease_dates = [];

let tvCurrentImage = 0;

const urlTV =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_monetization_types=flatrate&watch_region=US";
const tvCarouselImage = document.getElementById("tvImage");
const tvTitleElement = document.getElementById("tvTitle");
const tvOverviewElement = document.getElementById("tvOverview");
const tvReleaseDateElement = document.getElementById("tvReleaseDate");
const tvRatingElement = document.getElementById("tvRating");

async function fetchTV() {
  const res = await fetch(urlTV, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTc5NmE2YThmZGZhODNjNzQ0YzNhMTFmOTM3MGY3NiIsIm5iZiI6MTc0NTI5NjMyNi4yNzEwMDAxLCJzdWIiOiI2ODA3MWJjNmUzZmFjMmY5MDI4YTMxZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XeJjKvrJdiClO2DOlt2DchPgVyUnzfo4fBZ5PD9xlQk",
      Accept: "application/json",
    },
  });

  const data = await res.json();
  const tvs = data.results;

  tvs.forEach((tv) => {
    if (tv.poster_path) {
      tvImageUrls.push(`https://image.tmdb.org/t/p/w500${tv.poster_path}`);
      tvTitles.push(tv.name || "Untitled");
      tvOverviews.push(tv.overview || "No description available.");
      tvRelease_dates.push(tv.first_air_date || "Release date unavailable");
      tvRatings.push(tv.vote_average || "Rating unavailable");
    }
  });

  updateTVDisplay();
}

function rejectTV() {
    tvCurrentImage = (tvCurrentImage + 1) % tvImageUrls.length;
  updateTVDisplay();
}

function acceptTV() {
  const tvData = {
    title: tvTitles[tvCurrentImage],
    overview: tvOverviews[tvCurrentImage],
    poster_path: tvImageUrls[tvCurrentImage],
    release_date: tvRelease_dates[tvCurrentImage],
    vote_average: tvRatings[tvCurrentImage],
  };

  fetch("/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tvData),
  })
    rejectTV();
}

function updateTVDisplay() {
  tvCarouselImage.src = tvImageUrls[tvCurrentImage];
  tvTitleElement.textContent = tvTitles[tvCurrentImage];
  tvOverviewElement.textContent = tvOverviews[tvCurrentImage];
  tvReleaseDateElement.textContent = tvRelease_dates[tvCurrentImage];
  tvRatingElement.textContent = tvRatings[tvCurrentImage];
}

fetchTV();
