import { transports, format, createLogger, addColors } from 'winston';
const { combine, colorize, printf, timestamp, uncolorize } = format;

import args from "./arguments.utils.js";

const levels = {
    fatal: 0,
    error: 1,
    info: 2,
    http: 3,
};

const winTransports = () => {
    const { env } = args;
    const isDevelopment = env == 'development';

    if (isDevelopment) {
        const devTransports = [new transports.Console({ level: "http" })];

        return devTransports
    } else {
        const prodTransports = [
            new transports.Console({ level: "http" }),
            new transports.File({ filename: 'src/logs/errors.log', level: 'error' })
        ];

        return prodTransports
    }
};


const winFormat = () => {
    const { env } = args;

    const isDevelopment = env == 'development';

    const colors = { fatal: "red", error: "yellow", info: "blue", http: "green" };
    addColors(colors);

    return combine(
        isDevelopment ? colorize(colors) : uncolorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        printf((info) => `${info.level}: ${info.message} - ${info.timestamp}ms`)
    );
}

const Logger = createLogger({
    levels,
    format: winFormat(),
    transports: winTransports(),
    exitOnError: false,
});

export default Logger;