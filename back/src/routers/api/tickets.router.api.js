import CustomRouter from "../customRouter.js";

import {
    report,
} from "../../controllers/orders.controller.js";


class Router extends CustomRouter {
    init() {
        this.read("/", ["PREMIUM", 'USER'], report);
    }
}

const ticketsRouter = new Router().getRouter();
export default ticketsRouter;
