import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { body, matchedData, validationResult } from 'express-validator';

import { findUserByUsername, addUser } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

const userValidations = () => body('username')
    .trim().notEmpty().withMessage('Username is required.').bail()
    .isLength({ min: 8 }).withMessage('Username must be at least eight characters long.')
    .matches(/^[\w\.]+$/).withMessage('Username should only contain letters, numbers, periods, and underscores.')
    .matches(/^[a-zA-Z].*[a-zA-Z\d]$/).withMessage('Username must start with a letter and end with a letter or number.');

const passwordValidations = () => body('password')
    .trim().notEmpty().withMessage('Password is required.').bail()
    .isStrongPassword().withMessage(
        'Password is not strong enough. It must be at least 8 characters long and contain one of each of the following: lowercase letters, uppercase letters, numbers, and special characters.'
    ).bail()
    .custom((passValue, { req }) => !passValue.includes(req.body.username) && !passValue.toLowerCase().includes('password'))
        .withMessage("Password must not contain the username or the word 'password'.");

app.post('/users', userValidations(), passwordValidations(),
    async (req, res) => {
        const result = validationResult(req);
        let status;
        
        if (!result.isEmpty()) {
            let errorMessages = {};
    
            for (const error of result.errors) {
                if (error.path in errorMessages) {
                    errorMessages[error.path].push(error.msg);
                } else {
                    errorMessages[error.path] = [error.msg];
                }
            }

            status = 400;
            res.status(status).json({ status, errors: errorMessages });
            return;
        }

        const { username, password } = matchedData(req);
        const user = findUserByUsername(username);

        if (user) {
            status = 409;
            res.status(status).json({ status, errorMessage: 'A user with this username already exists!' });
            return;
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            addUser(username, hashedPassword);

            status = 201;
            res.status(status).json({ status, successMessage: 'You have successfully signed up! Please login to your account.' });
        } catch (error) {
            console.error(error);
            status = 500;
            res.status(status).json({ status, errorMessage: 'Something went wrong. Please try again later.' });
        }
    }
);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});