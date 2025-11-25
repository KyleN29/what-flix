import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
// import movieRoutes from './routes/movieRoutes.js';
import accountCommandController from './commandService/controllers/accountCommandController.js'
import accountQueryController from './queryService/controllers/accountQueryController.js'
// import MovieService, {type Movie} from './services/MovieService.js';
// import { MovieModel } from './models/Movie.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors())
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.use('/movie', movieRoutes)
app.use('/user', accountCommandController)
app.use('/user', accountQueryController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


