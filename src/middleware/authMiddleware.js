import jwt from 'jsonwebtoken';
import { handleServerError, handleUserError } from '../utils/errorHandlers.js';
import statusResponse from '../utils/statusResponse.js';

async function verifySession(req, res, next) {
    const sessionCookie = req.cookies.sessionId;
    if (!sessionCookie) return statusResponse(res, 400);

    try {
        jwt.verify(sessionCookie, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return statusResponse(res, 401);
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