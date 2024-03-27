import MongoManager from "./mongo.manager.js"
import orders from "./models/orders.model.js"

const ordersManager = new MongoManager(orders)
export default ordersManager