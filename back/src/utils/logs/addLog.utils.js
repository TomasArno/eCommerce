import Logger from "../winston.utils.js"

const addLog = (userId, data, winstonLevel = "info") => {
    Logger[winstonLevel] = data + ` | ${userId}`
}

export default addLog;
