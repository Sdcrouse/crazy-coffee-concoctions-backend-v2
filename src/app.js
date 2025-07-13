import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { body, matchedData, validationResult } from 'express-validator';

import { findUserByUsername, createUser } from './db.js';

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

// TODO: Rename this to '/signup' for naming consistency
// TODO: Remove the .bail() for the "strong password" validation in order to return multiple password errors
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
        const user = await findUserByUsername(username);

        if (user) {
            status = 409;
            res.status(status).json({ status, errorMessage: 'A user with this username already exists!' });
            return;
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await createUser(username, hashedPassword);

            status = 201;
            res.status(status).json({ status, successMessage: 'You have successfully signed up! Please login to your account.' });
        } catch (error) {
            console.error(error);
            status = 500;
            res.status(status).json({ status, errorMessage: 'Something went wrong. Please try again later.' });
        }
    }
);

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
            { expiresIn: '2h' }
        );
        const options = {
            maxAge: 2 * 60 * 60 * 1000, // Expires in 2 hours
            httpOnly: true,
            secure: true,
            sameSite: "None" 
        };
        res.cookie('SessionID', token, options);
        console.log(res);

        status = 200;
        res.status(status).json({ status, successMessage: `Welcome, ${username}! You are logged in.` });
    } catch (error) {
        console.error(error);
        status = 500;
        res.status(status).json({ status, errorMessage: 'Something went wrong. Please try again later.' });
    }
});

// Next step: Middleware and/or logout route
// It's possible that I'll need to expire the token and save it to a blacklist (requiring another MySQL table)
// For faster login, see if using jwt asynchronously will help (i.e. the jwt.sign part)

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});