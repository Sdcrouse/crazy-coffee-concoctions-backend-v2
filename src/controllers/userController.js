import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { matchedData, validationResult } from 'express-validator';
import { findUserByUsername, createUser, increaseTokenVersion } from '../databases/users.js';
import { handleServerError, handleUserError, handleUserErrors } from '../utils/errorHandlers.js';

const defaultTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    partitioned: true
};

async function signup(req, res) {
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

        return handleUserErrors(errorMessages, 400, res);
    }

    const { username, password } = matchedData(req);
    
    const user = await findUserByUsername(username);
    if (user) return handleUserError('A user with this username already exists!', 409, res);

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await createUser(username, hashedPassword);

        const status = 201;
        res.status(status).json({ status, successMessage: 'You have successfully signed up! Please login to your account.' });
    } catch (error) {
        handleServerError(error, 'Something went wrong while signing you up. Please try again later.', res);
    }
}

async function login(req, res) {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    let errors = {};

    if (!username || !password) {
        if (!username) errors.username = 'Username is missing';
        if (!password) errors.password = 'Password is missing';
        return handleUserErrors(errors, 400, res);
    }

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            errors.username = 'User not found';
            return handleUserErrors(errors, 404, res);
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        if (!passwordIsCorrect) {
            errors.password = 'Incorrect password';
            return handleUserErrors(errors, 401, res);
        }

        const userId = user.id;
        const {accessToken, accessOptions} = createAccessTokenAndOptions(userId);
        res.cookie('sessionId', accessToken, accessOptions);

        const refreshToken = jwt.sign(
            { id: userId, version: user.ref_token_version },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }
        );
        const refreshOptions = {
            ...defaultTokenOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000 // Expires in 7 days
        };
        res.cookie('refreshToken', refreshToken, refreshOptions);

        const status = 200;
        res.status(status).json({ status, successMessage: `Welcome, ${username}! You are logged in.` });
    } catch (error) {
        handleServerError(error, 'Something went wrong while logging you in. Please try again later.', res);
    }
}

async function refresh(req, res) {
    try {
        const {accessToken, accessOptions} = createAccessTokenAndOptions(req.userId);
        res.cookie('sessionId', accessToken, accessOptions);
        
        const status = 200;
        res.status(status).json({ status });
    } catch (error) {
        handleServerError(error, 'Something went wrong while refreshing your session. Please try again later.', res);
    }
}

async function logout(req, res) {
    try {
        await increaseTokenVersion(req.userId, req.version);

        const tokenOptions = {
            ...defaultTokenOptions,
            maxAge: 0
        };

        res.cookie('sessionId', '', tokenOptions);
        res.cookie('refreshToken', '', tokenOptions);

        const status = 200;
        res.status(status).json({ status, logoutSuccessMessage: 'You have successfully logged out!' });
    } catch (error) {
        handleServerError(error, 'Something went wrong while logging you out. Please try again later.', res);
    }
}

function createAccessTokenAndOptions(id) {
    const accessToken = jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const accessOptions = {
        ...defaultTokenOptions,
        maxAge: 15 * 60 * 1000 // Expires in 15m
    };

    return { accessToken, accessOptions };
}

export { signup, login, refresh, logout };