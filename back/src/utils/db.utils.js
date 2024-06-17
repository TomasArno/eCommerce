import { connect } from "mongoose";
import Logger from "./winston.utils.js";

const dbConnection = async () => {
  try {
    connect(process.env.DB_URL);
    Logger.info("Mongo connection successfully");
  } catch (e) {
    Logger.fatal("Problems with db connection: " + e.message);
  }
};

export default dbConnection;
