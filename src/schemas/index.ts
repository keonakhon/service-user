/* Base Schema */
import { gql } from "apollo-server";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query

  interface ServerError {
    message: String
  }

  type SomethingWrong implements ServerError {
    message: String
  }

  interface LoginError {
    message: String
  }
`;

export default typeDefs;
