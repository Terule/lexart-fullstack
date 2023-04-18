import express from 'express';
import searchRoute from './Routes/searchRoute';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/search', searchRoute);

export default app;
