import express, { json, urlencoded } from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from "express-compression"
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import options from "./utils/swagger.utils.js";
import './utils/env.utils.js';
import __dirname from './utils/dirname.utils.js';
import errorHandler from './middlewares/errorHandler.mid.js';
import pathHandler from './middlewares/pathHandler.mid.js';
import winston from "./middlewares/winston.mid.js";

import indexRouter from './routers/index.router.js';

const specs = swaggerJSDoc(options);

const app = express();

// MIDDLEWARES

app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(compression({ brotli: { enabled: true, zlib: {} }, }));
app.use(winston);
app.use("/api/docs", serve, setup(specs));

app.use('/', indexRouter);
app.use(errorHandler);
app.use(pathHandler);

export default app;
