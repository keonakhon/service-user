import { buildSchema } from "graphql";
import { gql } from "apollo-server";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query
`;

export default typeDefs;
