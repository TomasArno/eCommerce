import MongoManager from "./mongo.manager.js"
import payments from "./models/payments.model.js"

const paymentsManager = new MongoManager(payments)

export default paymentsManager