import jwt from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
    let status;

    try {
        const sessionCookie = req.cookies.sessionId;
        if (!sessionCookie) {
            status = 400;
            return res.status(status).json({ status, message: 'No session ID provided. Please log in.' });
        }
    
        jwt.verify(sessionCookie, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                status = 401;
                return res.status(status).json({ status, message: 'Either this session has expired, or an invalid session ID was provided. Please log in.' });
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

export default authMiddleware;