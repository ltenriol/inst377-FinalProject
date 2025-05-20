## Developers Manual

### Getting Started

To run the project:

1. Clone the repository:
   git clone https://github.com/ltenriol/inst377-FinalProject.git
   cd inst377-FinalProject 

2. Open the files on and IDE (Preferably Visual Studio Code)

3. Ensure that Node.js is installed on device. Then, run these commands to install these packages:

   - npm init
   - npm install express
   - npm install nodemon
   - npm install body-parse

4. Add "start": "nodemon -e '*'" to script in package.json file.

5. Run the "npm start" command in terminal and open the website using http://localhost:3000/ in a browser. 

 ### File Overview

 - "Final-Home.html"
   This is the home page of the website. The page will display trending movies and trending shows, alongside the other button that connects to the Movie Matchmaker page and Watchlist page. This page relies on "Final-Home-Movies.js" and "Final-Home-TV.js" that functions the trending carousels. 

 - "Final-Home-Movies.js" and "Final-Home-TV.js"
   These files are the backbones that give life to the carousels on the home page. They link to the TMDB API and fetch data from their "Trending Movies" and "Trending TV" sections. "prevMovie()" and "prevTV()" functions displays the previous movies/shows and "nextMovie()" and "nextTV()" displays the next show. 

 - "Final-Matchmaker.html"
   This is the matchmaker page, which is where users could "accept" a movie by pressing the green button, which saves the movie to the watchlist or "rejects" the movie which shuffles the display to the next movie/show. This page relies on "Final-Matchmaker.js" for movies and "Final-Matchmaker-TV.js" for TV shows.

 - "Final-matchmaker.js" and "Final-Matchmaker-TV.js"
   These files give data on movies and shows that are displayed on the Matchmaker page. They link to the TMDB API and fetch data from their "Discover Movies" and "Discover TV" sections. "rejectMovie()" and "rejectTV()" are used to shuffle to the next movie. On the other hand, "acceptMovie()" and "acceptTV()" adds the movies or shows using the POST method to the Supabase database, which is displayed on the Watchlist page. 

 - "Final-Watchlist.html"
   This displays the Watchlist page of the website. The Watchlist is connected to a Supabase database, and displays the movies that were "accepted" on the Matchmaker page. Relies on "Final-Watchlist.js" to connect to database.
 
 - "Final-Watchlist.js"
   This file retrieves data from the Supabase database. This file also sets the table that is displayed on the table on the Watchlist Page. 

 - "index.js"
   This is the backend of the website that connects to Node and Express servers. It handles the interaction between the Supabase, and allows the webpage to GET and POST to the database.

 - "vercel.json"
   Connects the webpage to Vercel, which hosts the website. 

 ### TMDB API 

 For this website, TMDB API is used to get data on the movies and shows. To use the website, it is required to create a free account. The TMDB API will give an authentication key that must be used alongside the API for the data to go through. This website utilizes their Trending section for the Home page and Discover section for the Matchmaker page. 

 ### Supabase

 Supabase is created to store the "accepted" movies and shows from the Matchmaker page. It is required to create a free account to the website. It could then be linked to this website using Node. How it can be connected could be viewed in Index.js. 

 ### Vercel

 Vercel is used to host Movie Matchmaker. To create a Vercel account, it is possible to create an account by linking it with a GitHub account. From there, a GitHub respository could be linked to the website. When edits are made to the code, it could be pushed onto the GitHub repository, which will automatically update the website. For this website, a Supabase key is required to be inserted by clicking Settings in Vercel and adding your Supabase URL and Key to the Environmental Variables section. 


