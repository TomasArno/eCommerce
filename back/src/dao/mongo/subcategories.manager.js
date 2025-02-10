import MongoManager from "./mongo.manager.js";
import subcategories from "./models/subcategories.model.js";

const subcategoriesManager = new MongoManager(subcategories);
export default subcategoriesManager;
