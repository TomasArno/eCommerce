import app from "./app.js";
// import createCluster from "./utils/createCluster.utils.js"; No lo utilizo porque no lo soporta railway
import Logger from "./utils/winston.utils.js";

const PORT = process.env.PORT || 8080;
const cbReady = () => Logger.info('Server running on port ' + PORT)

app.listen(PORT, cbReady)


