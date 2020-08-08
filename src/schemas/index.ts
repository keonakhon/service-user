import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type LoginWithFB {
    status: String
  }

  type Query {
    hello: String
    fbLogin(status: String!): LoginWithFB
  },
`);

export default schema;
