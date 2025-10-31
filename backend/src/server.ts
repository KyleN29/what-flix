import MovieService from './services/MovieService.js';
import express from 'express'
import cors from 'cors'
const app = express();
const port = 3000;
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/movie/popular', async (req, res) => {
  const data = await MovieService.getPopularMovies();
  res.json(data);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
