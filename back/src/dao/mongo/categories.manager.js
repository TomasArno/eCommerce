import MongoManager from "./mongo.manager.js";
import categories from "./models/categories.model.js";

const categoriesManager = new MongoManager(categories);
export default categoriesManager;
