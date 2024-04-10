import express, { json, urlencoded } from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.mid.js';
import pathHandler from './middlewares/pathHandler.mid.js';
import compression from "express-compression"

import './utils/env.utils.js';
import __dirname from './utils/dirname.utils.js';

import indexRouter from './routers/index.router.js';

const app = express();

// MIDDLEWARES

app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(compression({ brotli: { enabled: true, zlib: {} }, }));

app.use('/', indexRouter);
app.use(errorHandler);
app.use(pathHandler);

export default app;
