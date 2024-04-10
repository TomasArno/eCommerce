function errorHandler(error, req, res, next) {
	res.json({
		statusCode: error.statusCode || 500,
		url: req.url,
		message: error.message,
		method: req.method,
	});
}

export default errorHandler;
