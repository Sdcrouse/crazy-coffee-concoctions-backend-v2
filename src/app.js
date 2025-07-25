import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { verifySession } from './middleware/authMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import concoctionRoutes from './routes/concoctionRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));
app.use(cookieParser());

// Routes
app.use('/concoctions', verifySession, concoctionRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});