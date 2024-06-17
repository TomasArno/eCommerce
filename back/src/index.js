import app from "./app.js";
import createCluster from "./utils/createCluster.utils.js";

const PORT = process.env.PORT || 8080;
const cbReady = () => console.log('Server running on port ' + PORT)

createCluster(() => app.listen(PORT, cbReady))


