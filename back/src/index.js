import app from "./app.js";
import createCluster from "./utils/createCluster.utils.js";
import Logger from "./utils/winston.utils.js";

const PORT = process.env.PORT || 8080;
const cbReady = () => Logger.info('Server running on port ' + PORT)

createCluster(() => app.listen(PORT, cbReady))


