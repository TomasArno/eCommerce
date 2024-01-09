function errorHandler(error, req, res, next) {
  console.log("e", error);

  return res.json({
    statusCode: error.statusCode || 500,
    message: `${req.method} ${req.url} ${error.message}`,
  });
}

export default errorHandler;
