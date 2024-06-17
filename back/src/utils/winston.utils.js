import { transports, format, createLogger } from 'winston';

import args from "./arguments.utils.js";

const levels = {
    fatal: 0,
    error: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const { env } = args;

    const isDevelopment = env == 'development';

    return isDevelopment ? 'debug' : 'info';
};

const winTransports = () => {
    const { env } = args;
    const isDevelopment = env == 'development';

    if (isDevelopment) {
        const devTransports = [new transports.Console({ level: "http" })];

        return devTransports
    } else {
        const prodTransports = [
            new transports.File({ filename: 'logs/all.log' }),
            new transports.File({
                filename: 'logs/excepcions.log',
                level: 'fatal',
                handleExceptions: true,
            }),
            new transports.File({
                filename: 'logs/warnings.log',
                level: 'error',
            }),
        ];

        return prodTransports
    }
};

const winFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const Logger = createLogger({
    levels,
    level: level(),
    format: winFormat,
    transports: winTransports(),
    exitOnError: false,
});

export default Logger;
