import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";

// Env from .env
dotenv.config();

// DB Connection Class
import DBConnection from "./configs/db_connection";

// Connect DB
DBConnection.Connect();

// graphql schema
import typeDefs from "./schemas/index";
import fbLoginTypeDefs from "./schemas/query/fb_login";
import userTypeDefs from "./schemas/query/user";

// graphql resolver
import resolvers from "./resolvers/index";

// graphql context
const context = async ({ req }: any) => {
  const token = req?.headers?.authorization || "";

  return { token };
};

// Set up Apollo Server
const app = new ApolloServer({
  typeDefs: [typeDefs, fbLoginTypeDefs, userTypeDefs],
  resolvers,
  context,
  playground: true
});

export default app;
