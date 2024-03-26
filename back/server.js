import 'dotenv/config.js';

import express, { json, urlencoded } from 'express';

import { engine } from 'express-handlebars';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorHandler from './src/middlewares/errorHandler.mid.js';
import pathHandler from './src/middlewares/pathHandler.mid.js';

import indexRouter from './src/routers/index.router.js';

import dbConnection from './utils/db.utils.js';
import __dirname from './utils/dirname.utils.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  dbConnection();
});

// VIEWS

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

// MIDDLEWARES

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.use('/', indexRouter);
app.use(errorHandler);
app.use(pathHandler);
