const errors = {
    unauthorized: { message: "Unauthorized to modify this resource", statusCode: 400 },
    error: { message: "Error", statusCode: 400 },
    notVerified: { message: "Not verified", statusCode: 400 },
    token: { message: "Invalid token", statusCode: 400 },
    auth: { message: "Invalid credentials", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "No document was found", statusCode: 404 },
    fatal: { message: "Internal error", statusCode: 500 },
};

export default errors;