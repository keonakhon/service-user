/* DB Connection Config */
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import ConfigKey from "../configs/config";

let fwURI = ConfigKey.fw_user_uri;
let dbName = ConfigKey.fw_user_db_name;

const mongod = new MongoMemoryServer();

class DBConnection {
  constructor() {}

  async Connect() {
    if (process.env.NODE_ENV === "test") {
      fwURI = await mongod.getUri();
    }

    mongoose
      .connect(fwURI, {
        dbName,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify - Make Mongoose use `findOneAndUpdate()`. This option is `true` by default
        useFindAndModify: false
      })
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default new DBConnection();
