import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import authMiddleware from './middleware/authMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import concoctionRoutes from './routes/concoctionRoutes.js';
import { findUserByUsername } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));
app.use(cookieParser());

// Routes
app.use('/concoctions', authMiddleware, concoctionRoutes);
app.use('/users', userRoutes);

app.post('/login', async (req, res) => {
    let status;
    let errors = {};

    let {username, password} = req.body;
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
        status = 401;

        if (!username) errors.username = 'Username is missing';
        if (!password) errors.password = 'Password is missing';

        res.status(status).json({ status, errors });
        return;
    }

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            status = 404;
            errors.username = 'User not found';
            res.status(status).json({ status, errors });
            return;
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            status = 401;
            errors.password = 'Incorrect password';
            res.status(status).json({ status, errors });
            return;
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );
        const options = {
            maxAge: 30 * 60 * 1000, // Expires in 30m
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            partitioned: true
        };
        res.cookie('sessionId', token, options);

        status = 200;
        res.status(status).json({ status, successMessage: `Welcome, ${username}! You are logged in.` });
    } catch (error) {
        console.error(error);
        status = 500;
        res.status(status).json({ status, errorMessage: 'Something went wrong. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});