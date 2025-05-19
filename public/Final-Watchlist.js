async function loadMovieData() {
    await fetch (`/movies`)
    .then((result)  => result.json())
    .then((resultJson) => {
        const table = document.createElement("movieTable");
        table.setAttribute('id', 'movieInfo');
        
        const tableRow = document.createElement("tr");

        const tableHeadingTitle = document.createElement("th");
        tableHeadingTitle.innerHTML = "Title";
        tableRow.appendChild(tableHeadingTitle);

        const tableHeadingOverview = document.createElement("th");
        tableHeadingOverview.innerHTML = "Overview";
        tableRow.appendChild(tableHeadingOverview);

        const tableHeadingPoster = document.createElement("th");
        tableHeadingPoster.innerHTML = "Poster";
        tableRow.appendChild(tableHeadingPoster);

        const tableHeadingGenre = document.createElement("th");
        tableHeadingGenre.innerHTML = "Genre";
        tableRow.appendChild(tableHeadingGenre);

        const tableHeadingReleaseDate = document.createElement("th");
        tableHeadingReleaseDate.innerHTML = "Release Date";
        tableRow.appendChild(tableHeadingReleaseDate);

        const tableHeadingRating = document.createElement("th");
        tableHeadingRating.innerHTML = "Rating";
        tableRow.appendChild(tableHeadingRating);

        table.appendChild(tableRow);

        resultJson.forEach((movie) => {
            const movieTableRow = document.createElement("tr");
            const movieTitle = document.createElement("td");
            const movieOverview = document.createElement("td");
            const moviePoster = document.createElement("td");
            const movieGenre = document.createElement("td");
            const movieReleaseDate = document.createElement("td");
            const movieRating = document.createElement("td");

            movieTitle.innerHTML = movie.title;
            movieOverview.innerHTML = movie.overview;
            moviePoster.innerHTML = `<img src="${movie.poster_path}" alt="Movie Poster" width="100" height="150">`;
            movieGenre.innerHTML = movie.genre;
            movieReleaseDate.innerHTML = movie.release_date;
            movieRating.innerHTML = movie.vote_average;

            movieTableRow.appendChild(movieTitle);
            movieTableRow.appendChild(movieOverview);
            movieTableRow.appendChild(moviePoster);
            movieTableRow.appendChild(movieGenre);
            movieTableRow.appendChild(movieReleaseDate);
            movieTableRow.appendChild(movieRating);

            table.appendChild(movieTableRow);
    });
    document.body.appendChild(table);
});
}
window.onload = loadMovieData;