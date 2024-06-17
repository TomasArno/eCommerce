import morgan from 'morgan';
import Logger from "../utils/winston.utils.js";

const stream = {
    write: (message) => Logger.http(message),
};

morgan.token('body', (req, res) => JSON.stringify(req['body']));

const morganAndWiston = morgan(
    ':method :url :body :status -- :res[content-length] :response-time ms',
    { stream }
);

export default morganAndWiston;