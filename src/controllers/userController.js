import bcrypt from 'bcryptjs';

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

export { signup };