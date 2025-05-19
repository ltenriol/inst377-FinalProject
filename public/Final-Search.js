  async function handleSearch() {
    const query = document.getElementById("searchInput").value.trim();
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    if (!query) return;

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTc5NmE2YThmZGZhODNjNzQ0YzNhMTFmOTM3MGY3NiIsIm5iZiI6MTc0NTI5NjMyNi4yNzEwMDAxLCJzdWIiOiI2ODA3MWJjNmUzZmFjMmY5MDI4YTMxZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XeJjKvrJdiClO2DOlt2DchPgVyUnzfo4fBZ5PD9xlQk",
          Accept: "application/json",
        },
      });

      const data = await res.json();
      const results = data.results;

      if (!results.length) {
        resultsContainer.innerHTML = "<p>no results found.</p>";
        return;
      }

      results.forEach((item) => {
        const title = item.title || item.name || "Untitled";
        const poster = item.poster_path
          ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
          : "";
        const overview = item.overview || "No description available.";
      });
    } catch (error) {
      console.error("Search failed", error);
      resultsContainer.innerHTML = "<p>Error Loading</p>";
    }
  }
