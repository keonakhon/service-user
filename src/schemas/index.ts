/* Base Schema */
import { gql } from "apollo-server";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query

  interface LoginError {
    message: String
  }
`;

export default typeDefs;
