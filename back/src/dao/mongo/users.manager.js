import MongoManager from "./mongo.manager.js"
import users from "./models/users.model.js"


const usersManager = new MongoManager(users)
export default usersManager