import MongoManager from "./mongo.manager.js"
import products from "./models/products.model.js"


const productsManager = new MongoManager(products)
export default productsManager