const tvImageUrls = [];
const tvTitles = [];
const tvOverviews = [];
const tvRatings = []; 
let currentTV = 0;

const urlTV = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
const tvImage = document.getElementById("tvImage");
const tvTitle = document.getElementById("tvTitle");
const tvOverview = document.getElementById("tvOverview");
const tvRating = document.getElementById("tvRating");

async function fetchShows() {
  const res = await fetch(urlTV, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTc5NmE2YThmZGZhODNjNzQ0YzNhMTFmOTM3MGY3NiIsIm5iZiI6MTc0NTI5NjMyNi4yNzEwMDAxLCJzdWIiOiI2ODA3MWJjNmUzZmFjMmY5MDI4YTMxZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XeJjKvrJdiClO2DOlt2DchPgVyUnzfo4fBZ5PD9xlQk",
      Accept: "application/json",
    },
  });

  const data = await res.json();
  const tv = data.results;

  tv.forEach((show) => {
    if (show.poster_path) {
      tvImageUrls.push(`https://image.tmdb.org/t/p/w500${show.poster_path}`);
      tvTitles.push(show.name || "Untitled");
      tvOverviews.push(show.overview || "No description available.");

      // const rating = show.vote_average;
      // tvRatings.push(
      //   rating && rating > 0 ? rating.toFixed(1) : "Rating unavailable"
      // );
    }
  });

  updateTVDisplay();
}

function nextTV() {
  currentTV = (currentTV + 1) % tvImageUrls.length;
  updateTVDisplay();
}

function prevTV() {
  currentTV = (currentTV - 1 + tvImageUrls.length) % tvImageUrls.length;
  updateTVDisplay();
}

function updateTVDisplay() {
  tvImage.src = tvImageUrls[currentTV];
  tvTitle.textContent = tvTitles[currentTV];
  tvOverview.textContent = tvOverviews[currentTV];
  tvRating.textContent = tvRatings[currentTV];
}

fetchShows();
