import express from 'express';
import bcrypt from 'bcryptjs';
import { body, matchedData, validationResult } from 'express-validator';

import { findUserByUsername, addUser } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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