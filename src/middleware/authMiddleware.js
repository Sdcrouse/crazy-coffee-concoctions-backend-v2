import jwt from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
    let status;

    try {
        const sessionCookie = req.cookies.sessionId;
        if (!sessionCookie) {
            status = 400;
            return res.status(status).json({ status });
        }
    
        jwt.verify(sessionCookie, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                status = 401;
                return res.status(status).json({ status });
            }

            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        console.error(error);
        status = 500;
        res.status(status).json({ status, errorMessage: 'Something went wrong while verifying the session. Please try again later.' });
    }
}

async function verifyRefreshToken(req, res, next) {
    let status;

    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            status = 400;
            return res.status(status).json({ status, errorMessage: 'No refresh token provided. Please log in.' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                status = 401;
                return res.status(status).json({ status, errorMessage: 'Either this refresh token has expired, or an invalid token was provided. Please log in.' });
            }

            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        console.error(error);
        status = 500;
        res.status(status).json({ status, errorMessage: 'Something went wrong while verifying the refresh token. Please try again later.' });
    }
}

export { verifyRefreshToken };
export default authMiddleware;