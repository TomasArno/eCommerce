function errorHandler(error, req, res, next) {
  console.log("e", error);

  return res.json({
    statusCode: error.statusCode || 500,
    response: `${req.method} ${req.url} ${error.message}`,
  });
}

export default errorHandler;
