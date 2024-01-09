import express, { json, urlencoded } from "express";

import morgan from "morgan";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/PathHandler.js";

import indexRouter from "./src/routers/index.router.js";

import __dirname from "./utils.js";

const app = express();

const PORT = 8080;

app.listen(PORT, () => console.log("Server running on port " + PORT));

// MIDDLEWARES
//usar los propsevents en los endpoint
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use("/", indexRouter);
app.use(errorHandler);
app.use(pathHandler);
