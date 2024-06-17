import cluster from "node:cluster"
import { cpus } from "node:os"

const cores = cpus()

const createCluster = (initApp) => {
    if (cluster.isPrimary) {
        cores.forEach(() => cluster.fork());
    } else {
        initApp()
    }
}

export default createCluster