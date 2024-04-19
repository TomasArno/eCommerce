import logger from "../utils/winston.utils.js";

function wintson(req, res, next) {
    try {
        req.logger = logger;

        const message = `${req.method} ${req.url}`
        logger.http(message);

        return next();
    } catch (error) {
        return next(error);
    }
}

export default wintson;