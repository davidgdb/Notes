import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import notesRoutes from './routes/notesRoutes.js';
import { connectToDatabase } from './config/db.js';
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}))
app.use(express.json());
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log('Server started on PORT:', PORT);
  });
});
