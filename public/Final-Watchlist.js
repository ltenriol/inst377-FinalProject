// Loads the data into Supabase
async function loadMovieData() {
    await fetch (`/movies`)
    .then((result)  => result.json())
    .then((resultJson) => {
        const table = document.createElement("table");
        table.setAttribute('id', 'movieInfo');
        table.classList.add('saved-table');

        // Create table headers        
        const tableRow = document.createElement("tr");

        const tableHeadingTitle = document.createElement("th");
        tableHeadingTitle.innerHTML = "Title";
        tableRow.appendChild(tableHeadingTitle);

        const tableHeadingPoster = document.createElement("th");
        tableHeadingPoster.innerHTML = "Poster";
        tableRow.appendChild(tableHeadingPoster);

        const tableHeadingOverview = document.createElement("th");
        tableHeadingOverview.innerHTML = "Overview";
        tableRow.appendChild(tableHeadingOverview);

        const tableHeadingReleaseDate = document.createElement("th");
        tableHeadingReleaseDate.innerHTML = "Release Date";
        tableRow.appendChild(tableHeadingReleaseDate);

        const tableHeadingRating = document.createElement("th");
        tableHeadingRating.innerHTML = "Rating";
        tableRow.appendChild(tableHeadingRating);

        table.appendChild(tableRow);

        // Create table rows for each movie
        resultJson.forEach((movie) => {
            const movieTableRow = document.createElement("tr");
            const movieTitle = document.createElement("td");
            const moviePoster = document.createElement("td");
            const movieOverview = document.createElement("td");
            const movieReleaseDate = document.createElement("td");
            const movieRating = document.createElement("td");

            movieTitle.innerHTML = movie.title;
            moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Poster" width="100" height="150">`;
            movieOverview.innerHTML = movie.overview;
            movieReleaseDate.innerHTML = movie.release_date;
            movieRating.innerHTML = movie.vote_average;

            movieTableRow.appendChild(movieTitle);
            movieTableRow.appendChild(moviePoster);
            movieTableRow.appendChild(movieOverview);
            movieTableRow.appendChild(movieReleaseDate);
            movieTableRow.appendChild(movieRating);

            table.appendChild(movieTableRow);
    });
    document.body.appendChild(table);
});
}
window.onload = loadMovieData;