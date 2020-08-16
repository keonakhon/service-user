import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import keys from "./keys";

let uri = keys.uri;

const mongod = new MongoMemoryServer();

class DBConnection {
  constructor() {
    this.connect();
  }

  async connect() {
    if (process.env.NODE_ENV === "test") {
      uri = await mongod.getConnectionString();
    }

    mongoose
      .connect(uri, {
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
