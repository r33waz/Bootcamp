import mongooes from "mongoose";
import config from "./config.js";

export const dbconnect = async () => {
  const connection = await mongooes.connect(config.MONGO_URI, {
    useNewUrlParser: true,
  });
  console.log("Mongo connected", connection.connection.host);
};
