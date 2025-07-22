import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { matchedData, validationResult } from 'express-validator';
import { findUserByUsername, createUser } from '../db.js';

async function signup(req, res) {
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

// TODO: Add a refresh token
async function login(req, res) {
    let status;
    let errors = {};

    let {username, password} = req.body;
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
        status = 400;

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
}

export { signup, login };