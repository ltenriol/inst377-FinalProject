const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const supabaseURL= process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/Final-Home.html', { root: __dirname });
});

app.get('/', (req, res) => {
    res.sendFile('public/Final-Matchmaker.html', { root: __dirname });
});



app.get('/movies', async (req, res) => {
    console.log("Fetching movies");

    const { data, error } = await supabase
  .from('movies')
  .select()

  if (error) {
    console.error('Error fetching movies:', error);
    res.statusCode = 400;
    res.send(error);
  }

  res.send(data);
});

app.post('/movies', async (req, res) => {
    console.log("Adding movies");

    console.log(req.body);
    const title = req.body.title;
    const overview = req.body.overview;
    const poster_path = req.body.poster_path;
    const genre = req.body.genre;
    const release_date = req.body.release_date;
    const vote_average = req.body.vote_average;


    const { data, error } = await supabase
  .from('movies')
  .insert({ title: title, 
            overview: overview,
            poster_path: poster_path,
            genre: genre, 
            release_date: release_date,
            vote_average: vote_average })
  .select();

  if (error) {
    console.error('Error fetching movies:', error);
    res.statusCode = 500;
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`ALIIIIVE ON PORT ${port}` );
});