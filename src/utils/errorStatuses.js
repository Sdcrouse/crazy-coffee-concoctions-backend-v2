function handleServerError(error, errorMessage, response) {
    const status = 500;
    console.error(error);
    response.status(status).json({ status, errorMessage });
};

function handleUserError(errorMessage, status, response) {
    response.status(status).json({ status, errorMessage });
};

export { handleServerError, handleUserError };