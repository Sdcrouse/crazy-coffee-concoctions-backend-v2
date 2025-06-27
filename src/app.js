import express from 'express';
import bcrypt from 'bcryptjs';
import { body, matchedData, validationResult } from 'express-validator';

import { findUserByUsername, addUser } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post(
    '/users',
    body('username').trim().notEmpty().withMessage('Username is required.'),
    body('password').trim().notEmpty().withMessage('Password is required.'),
    async (req, res) => {
        const result = validationResult(req);
        
        if (!result.isEmpty()) {
            let errorMessages = {};
    
            for (const error of result.errors) {
                if (error.path in errorMessages) {
                    errorMessages[error.path].push(error.msg);
                } else {
                    errorMessages[error.path] = [error.msg];
                }
            }

            res.status(400).json({ errors: errorMessages });
            return;
        }

        const { username, password } = matchedData(req);
        const user = findUserByUsername(username);

        if (user) {
            res.status(409).json('A user with this username already exists!');
            return;
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            addUser(username, hashedPassword);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.status(500).json('Something went wrong. Please try again later.');
        }
    }
);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});