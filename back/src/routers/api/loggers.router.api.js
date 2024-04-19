import CustomRouter from "../customRouter.js";
import logger from "../../utils/winston.utils.js"

class Router extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], (req, res, next) => {
            logger.info("MENSAJE DE info")
            logger.error("MENSAJE DE error")
            logger.fatal("MENSAJE DE fatal")

            res.send("TEST LOGGER")
        });
    }
}

const loggersRouter = new Router().getRouter();
export default loggersRouter;
