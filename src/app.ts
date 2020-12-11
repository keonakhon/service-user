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
import fbLoginTypeDefs from "./schemas/fb_login";

// graphql resolver
import resolvers from "./resolvers/index";

// graphql context
const context = async ({ req }: any) => {
  const token = req?.headers?.authorization || "";

  return { token };
};

// Set up Apollo Server
const app = new ApolloServer({
  typeDefs: [typeDefs, fbLoginTypeDefs],
  resolvers,
  context,
  playground: true
});

export default app;
