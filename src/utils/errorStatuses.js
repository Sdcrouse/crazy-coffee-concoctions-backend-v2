function handleServerError(error, errorMessage, response) {
    const status = 500;
    console.error(error);
    response.status(status).json({ status, errorMessage });
}

function handleUserError(errorMessage, status, response) {
    response.status(status).json({ status, errorMessage });
}

function handleUserErrors(errors, status, response, errorMessage = '') {
    let errorJson = { status, errors };
    if (errorMessage) errorJson.errorMessage = errorMessage;
    return response.status(status).json(errorJson);
}

export { handleServerError, handleUserError, handleUserErrors };