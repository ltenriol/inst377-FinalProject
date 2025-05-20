// Creating space for data
const tvImageUrls = [];
const tvTitles = [];
const tvOverviews = [];
const tvRatings = []; 
let currentTV = 0;

// URL and elements that display the data
const urlTV = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
const tvImage = document.getElementById("tvImage");
const tvTitle = document.getElementById("tvTitle");
const tvOverview = document.getElementById("tvOverview");
const tvRating = document.getElementById("tvRating");

// Fetching the data
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

  // Filling in the arrays with data
  tv.forEach((show) => {
    if (show.poster_path) {
      tvImageUrls.push(`https://image.tmdb.org/t/p/w500${show.poster_path}`);
      tvTitles.push(show.name || "Untitled");
      tvOverviews.push(show.overview || "No description available.");
    }
  });

  updateTVDisplay();
}

// Shuffles to next TV show
function nextTV() {
  currentTV = (currentTV + 1) % tvImageUrls.length;
  updateTVDisplay();
}

// Shuffles to previous TV show
function prevTV() {
  currentTV = (currentTV - 1 + tvImageUrls.length) % tvImageUrls.length;
  updateTVDisplay();
}

// Updates the card with TV show
function updateTVDisplay() {
  tvImage.src = tvImageUrls[currentTV];
  tvTitle.textContent = tvTitles[currentTV];
  tvOverview.textContent = tvOverviews[currentTV];
  tvRating.textContent = tvRatings[currentTV];
}

fetchShows();
