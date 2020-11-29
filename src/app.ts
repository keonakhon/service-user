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

// graphql resolver
import resolvers from "./resolvers/index";

// graphql context
const context = async (req: any) => {
  const ip_address = req?.req?.ip || null;

  return { ip_address };
};

// Set up Apollo Server
const app = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: true
});

export default app;
