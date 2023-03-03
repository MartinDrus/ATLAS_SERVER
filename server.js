import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import moviesRouter from './src/routes/movies.routes.js'
import commentsRouter from './src/routes/comments.routes.js'

dotenv.config();
const PORT = process.env.API_PORT;
const app = express();
app.use(express.json());
app.use(cors());

//!----ROUTES----
app.use('/movies', moviesRouter);

app.use('/comments', commentsRouter);


//!--------------

console.log('Loading mflix server... 🎥')

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    )
    .then(() => console.log('Database connected! 😍'))
    .catch(() => console.log('Database is not connected! ☹️'));

app.listen(PORT, () => console.log(`The server is listening... 🎥 - Port: ${PORT}`));
