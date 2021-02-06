import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";

// Env from .env
dotenv.config();

// DB Connection Class
import DBConnection from "./helpers/db_connection";

// Connect DB
DBConnection.Connect();

// graphql schema
import typeDefs from "./schemas/index";
import fbLoginTypeDefs from "./schemas/query/fb_login";
import userTypeDefs from "./schemas/query/user";
import updateProfileTypeDefs from "./schemas/mutation/user";

// graphql resolver
import resolvers from "./resolvers/index";

const createApp = (context: any) => {
  try {
    // Set up Apollo Server
    const apolloServerApp = new ApolloServer({
      typeDefs: [
        typeDefs,
        fbLoginTypeDefs,
        userTypeDefs,
        updateProfileTypeDefs
      ],
      resolvers,
      context,
      playground: true
    });

    return apolloServerApp;
  } catch (err) {
    throw new Error(err);
  }
};

export default createApp;
