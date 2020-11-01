const http = require("http");
import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";

const port = process.env.PORT || 3000;

const server = http.createServer(app);
console.log(`server started at http://localhost:${port}`);

server.listen(port);
