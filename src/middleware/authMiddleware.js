import jwt from 'jsonwebtoken';
import { handleServerError, handleUserError } from '../utils/errorHandlers.js';

async function verifySession(req, res, next) {
    let status;

    const sessionCookie = req.cookies.sessionId;
    if (!sessionCookie) {
        status = 400;
        return res.status(status).json({ status });
    }

    try {
        jwt.verify(sessionCookie, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                status = 401;
                return res.status(status).json({ status });
            }

            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        handleServerError(error, 'Something went wrong while verifying the session. Please try again later.', res);
    }
}

async function verifyRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return handleUserError('No refresh token provided. Please log in.', 400, res);

    try {
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
            if (err) return handleUserError('Either this refresh token has expired, or an invalid token was provided. Please log in.', 401, res);

            req.userId = decoded.id;
            req.version = decoded.version;
            next();
        });
    } catch (error) {
        handleServerError(error, 'Something went wrong while verifying the refresh token. Please try again later.', res);
    }
}

export { verifySession, verifyRefreshToken };