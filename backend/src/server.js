import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; //for production;

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); //For production

//middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

// For Productions only
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// For Productions only end

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server running successfully in port', PORT);
  });
});
