  async function handleSearch() {
    const query = document.getElementById("searchInput").value.trim();
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear old results

    if (!query) return;

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: "Bearer YOUR_API_KEY_HERE",
          Accept: "application/json",
        },
      });

      const data = await res.json();
      const results = data.results;

      if (!results.length) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
      }

      results.forEach((item) => {
        const title = item.title || item.name || "Untitled";
        const poster = item.poster_path
          ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
          : "";
        const overview = item.overview || "No description available.";

        const resultHTML = `
          <div style="margin: 20px auto; max-width: 300px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            ${poster ? `<img src="${poster}" style="width: 100%; border-radius: 10px;" alt="${title} poster" />` : ""}
            <h4>${title}</h4>
            <p style="font-size: 14px;">${overview}</p>
          </div>
        `;
        resultsContainer.innerHTML += resultHTML;
      });
    } catch (error) {
      console.error("Search failed", error);
      resultsContainer.innerHTML = "<p>Error loading results. Please try again.</p>";
    }
  }
