export function handleServerError(error, errorMessage, response) {
    const status = 500;
    console.error(error);
    response.status(status).json({ status, errorMessage });
};