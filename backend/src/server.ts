import 'dotenv/config';
import app from './app';

const PORT = process.env.API_PORT ?? 3001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
