import jwt from 'jsonwebtoken';
import { handleServerError } from '../utils/errorStatuses.js';

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
    let status;

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        status = 400;
        return res.status(status).json({ status, errorMessage: 'No refresh token provided. Please log in.' });
    }

    try {
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                status = 401;
                return res.status(status).json({ status, errorMessage: 'Either this refresh token has expired, or an invalid token was provided. Please log in.' });
            }

            req.userId = decoded.id;
            req.version = decoded.version;
            next();
        });
    } catch (error) {
        handleServerError(error, 'Something went wrong while verifying the refresh token. Please try again later.', res);
    }
}

export { verifySession, verifyRefreshToken };