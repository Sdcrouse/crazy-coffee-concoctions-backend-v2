export default function statusResponse(response, status) {
    return response.status(status).json({ status });
};