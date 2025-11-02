import movieRoutes from './routes/movieRoutes.js';
import express from 'express'
import cors from 'cors'
const app = express();
const port = 3000;

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/movie', movieRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
