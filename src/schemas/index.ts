import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type LoginWithFB {
    refresh_token: String
  }

  type Query {
    hello: String
    fbLogin(fb_token: String!): LoginWithFB
  },
`);

export default schema;
