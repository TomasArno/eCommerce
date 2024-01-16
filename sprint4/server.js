import express, { json, urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import morgan from "morgan";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/PathHandler.js";

import indexRouter from "./src/routers/index.router.js";

import __dirname from "./utils.js";
import socketInit from "./socket.utils.js";

const app = express();
const httpServer = createServer(app);
const socketServer = new Server(httpServer);

const PORT = 8080;

httpServer.listen(PORT, () => console.log("Server running on port " + PORT));

socketServer.on("connection", socketInit);

// VIEWS

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

// MIDDLEWARES

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.use("/", indexRouter);
app.use(errorHandler);
app.use(pathHandler);

export { socketServer };
