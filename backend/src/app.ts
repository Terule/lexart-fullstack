import express from 'express';
import searchRoute from './Routes/searchRoute';

const app = express();

app.use(express.json());
app.use('/search', searchRoute);

export default app;
