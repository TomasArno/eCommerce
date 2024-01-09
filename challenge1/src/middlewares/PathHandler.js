function pathHandler(req, res, next) {
  return res.json({
    statusCode: 404,
    response: `${req.method} ${req.url} endpoint not found`,
  });
}

export default pathHandler;
