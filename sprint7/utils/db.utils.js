import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    connect(process.env.DB_URL);
    console.log("Mongo connection successfully");
  } catch (e) {
    console.log(e);
  }
};

export default dbConnection;
